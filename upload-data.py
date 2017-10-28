#!./venv/bin/python

from io import BytesIO
from configparser import ConfigParser

from mapbox import Uploader
from geojson import Point, Feature, FeatureCollection, dumps
import yaml

config = ConfigParser()
config.read('mapbox.ini')


sites = yaml.load(open('sites.yaml',encoding='utf-8').read())
points = FeatureCollection([Feature(geometry=Point(
    (float(s["longitude"]),
     float(s["latitude"]))),
        properties=dict(campaign=c['campaign'],
                        location="%i) %s" % (i+1, s['location']),
                        idx=str(i+1),
                        date=s['date'],
                        text=s['text']
                        )) for c in sites for i,s in enumerate(c['sites'])])

service = Uploader(access_token=config['mapbox']['access-token'])
upl = service.upload(BytesIO(dumps(points).encode('utf-8')), 'nzherald.new-zealand-wars-sites-v15',
                     name="New Zealand Wars Sites v15")

print(upl.json())
