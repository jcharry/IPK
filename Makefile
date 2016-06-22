#
# Makefile
# jamiecharry, 2016-06-17 15:36
#

all:
	rm -rf app/data/build/*
	rm -rf dist/data/*
	mkdir -p app/data/build
	mkdir -p dist/data
	make app/data/build/WATER_QUALITY_COMPLAINTS.json
	make app/data/build/NYC_RESERVOIR_LOCATIONS.json
	make app/data/build/WBDHU8.json

app/data/build/WATER_QUALITY_COMPLAINTS.json: app/data/src/WATER_QUALITY_COMPLAINTS.csv
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-x longitude \
		-y latitude \
		-o $@\
		-p \
		-- $<
	cp app/data/build/WATER_QUALITY_COMPLAINTS.json dist/data/WATER_QUALITY_COMPLAINTS.json
	aws s3api put-object --bucket no-free-lunch-data --key WATER_QUALITY_COMPLAINTS.json --body app/data/build/WATER_QUALITY_COMPLAINTS.json
	aws s3api put-object-acl --bucket no-free-lunch-data --key WATER_QUALITY_COMPLAINTS.json --acl public-read

app/data/build/NYC_RESERVOIR_LOCATIONS.json: app/data/src/NYC_RESERVOIR_LOCATIONS.csv
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-x longitude \
		-y latitude \
		-o $@\
		-p \
		-- $<
	cp app/data/build/NYC_RESERVOIR_LOCATIONS.json dist/data/NYC_RESERVOIR_LOCATIONS.json
	aws s3api put-object --bucket no-free-lunch-data --key NYC_RESERVOIR_LOCATIONS.json --body app/data/build/NYC_RESERVOIR_LOCATIONS.json
	aws s3api put-object-acl --bucket no-free-lunch-data --key NYC_RESERVOIR_LOCATIONS.json --acl public-read

app/data/build/WBDHU8.shp: app/data/src/WBDShape/WBDHU8.shp
	mkdir -p $(dir $@)
	ogr2ogr \
		-f 'ESRI Shapefile' \
		-t_srs EPSG:4326 \
		$@ \
		$<

app/data/build/WBDHU8.json: app/data/build/WBDHU8.shp
	mkdir -p $(dir $@)
	node_modules/.bin/topojson \
		-o $@ \
		--simplify-proportion=0.01\
		-p \
		-- $<
	cp $@ dist/data/WBDHU8.json
	aws s3api put-object --bucket no-free-lunch-data --key WBDHU8.json --body app/data/build/WBDHU8.json
	aws s3api put-object-acl --bucket no-free-lunch-data --key WBDHU8.json --acl public-read

# vim:ft=make
#
