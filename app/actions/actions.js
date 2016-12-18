import axios from 'axios';
import d3 from 'd3';

export const startLoading = function() {
    return {
        type: 'START_LOADING'
    };
};

export const stopLoading = function() {
    return {
        type: 'STOP_LOADING'
    };
};

export const setMapCenter = function(center) {
    return {
        type: 'SET_MAP_CENTER',
        center
    };
};
export const setMapBounds = function(bounds) {
    return {
        type: 'SET_MAP_BOUNDS',
        bounds
    };
};

// Public function
// finds project with associated ID, gets position
// then dispatches actions to the store
export const setMapCenterOnProject = function(id) {
    return (dispatch, getState) => {
        const project = getState().projects[id];
        switch (project.pointType) {
            case 'points': {
                const locations = JSON.parse(project.locations);

                const geojsonSrc = {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: locations.map(loc =>
                            ({
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [loc.lon, loc.lat]
                                }
                            })
                        )
                    }
                };

                const bounds = d3.geo.bounds(geojsonSrc.data);
                dispatch(setMapBounds(bounds));
                break;
            }
            case 'point': {
                const center = [project.longitude, project.latitude];
                dispatch(setMapCenter(center));
                break;
            }
            default:
                break;
        }
    };
};

export const dataIsLoading = function(isLoading) {
    return {
        type: 'LOADING_DATA',
        isLoading
    };
};
export const initializeProjectList = function(projects) {
    return {
        type: 'INITIALIZE_PROJECT_LIST',
        projects
    };
};


export const initializeCategories = function(projects) {
    return dispatch => {
        const cat = {};
        projects.forEach(prj => {
            if (cat[prj.category]) {
                if (cat[prj.category].projects.indexOf(prj._id) === -1) {
                    cat[prj.category].projects.push(prj._id);
                }
            } else {
                cat[prj.category] = { visible: false, projects: [prj._id] };
            }


            // if (cats.indexOf(prj.category) === -1) {
            //     cats.push(prj.category);
            //     dispatch(addCategory(prj.category));
            // }
        });
        dispatch(addCategories(cat));
    };
};

const addCategories = function(categories) {
    return {
        type: 'ADD_CATEGORIES',
        categories
    };
};
// const addCategory = function(category) {
//     return {
//         type: 'ADD_CATEGORY',
//         category
//     };
// };
// Moving away from getting data from amazon s3
// and moving towards having all data in a csv
// which could easily be moved to a database in the
// future
export const initializeProjectListFromDB = function() {
    return dispatch => {
        dispatch(dataIsLoading(true));
        axios.get('/api/mapitems').then(response => {
            dispatch(initializeProjectList(response.data));
            dispatch(initializeCategories(response.data));
            dispatch(dataIsLoading(false));
        });
    };
};

export const toggleCategory = function(category) {
    return {
        type: 'TOGGLE_CATEGORY',
        category
    };
};


export const setCurrentCategory = function(cat) {
    return {
        type: 'SET_CURRENT_CATEGORY',
        cat
    };
};

export const setHoverProject = function(id) {
    return {
        type: 'SET_HOVERED_PROJECT',
        id
    };
};

export const removeHoverProject = function() {
    return {
        type: 'REMOVE_HOVERED_PROJECT'
    };
};

export const showPopupWithProject = function(id, point) {
    return {
        type: 'SHOW_POPUP_WITH_PROJECT',
        id,
        point
    };
};

export const hidePopup = function() {
    return {
        type: 'HIDE_POPUP'
    };
};

export const setSelectedProject = function(id) {
    return {
        type: 'SET_SELECTED_PROJECT',
        id
    };
};

export const clearSelectedProject = function() {
    return {
        type: 'CLEAR_SELECTED_PROJECT'
    };
};

export const toggleMapLabels = function() {
    return {
        type: 'TOGGLE_MAP_LABELS'
    };
};

export const toggleMapLines = function() {
    return {
        type: 'TOGGLE_MAP_LINES'
    };
};

export const moveToProject = function(id) {
    return {
        type: 'MOVE_TO_PROJECT',
        id
    };
};

export const toggleMapDisplay = function(labelName) {
    return {
        type: 'TOGGLE_MAP_DISPLAY',
        labelName
    };
};

export const toggleMenu = function() {
    return {
        type: 'TOGGLE_MENU'
    };
};

export const toggleImpact = function() {
    return {
        type: 'TOGGLE_IMPACT'
    };
};

export const closeImpact = function() {
    return {
        type: 'CLOSE_IMPACT'
    };
};

export const startAddItem = function(data) {
    return dispatch => {
        dispatch(startLoading());
        axios.post('api/mapitem', data)
            .then(response => {
                console.log(response.data);
                dispatch(stopLoading());
            });
    };
};

// TODO: Implement this!!!!
export const startUpdateProject = function(id, updates) {
    return dispatch => {
        console.log(updates);
        axios.post(`api/mapitem/${id}/update`, updates)
            .then(response => {
                console.log(response);
                dispatch(updateProject(id, updates));
                dispatch(stopLoading());
            });
    };
};

export const updateProject = function(id, updates) {
    return {
        type: 'UPDATE_PROJECT',
        id,
        updates
    };
};

export const setBottomNavContent = function(id) {
    return {
        type: 'SET_BOTTOM_NAV_CONTENT',
        id
    };
};

export const clearBottomNavContent = function() {
    return {
        type: 'SET_BOTTOM_NAV_CONTENT',
        id: ''
    };
};
