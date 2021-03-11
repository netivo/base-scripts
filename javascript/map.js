const initMap = function() {

    const preparePoints = (mapElement) => {
        let lat = ('lat' in mapElement.dataset) ? mapElement.dataset.lat.split(';') : null;
        let lng = ('lng' in mapElement.dataset) ? mapElement.dataset.lng.split(';') : null;

        if(lat.length === lng.length){
            let zoom = (isNaN(parseInt(mapElement.dataset.zoom))) ? 14 : parseInt(mapElement.dataset.zoom);
            let title = ('title' in mapElement.dataset) ? mapElement.dataset.title.split(';') : null;
            let content = ('content' in mapElement.dataset) ? mapElement.dataset.content.split(';') : null;
            let markerIcon = ('marker' in mapElement.dataset) ? mapElement.dataset.marker.split(';') : null;

            let data = {
                zoom: zoom,
                points: []
            };
            lat.forEach((p1, i) => {
                let tmp = {
                    lat: parseFloat(p1),
                    lng: parseFloat(lng[i])
                };
                if(title !== null) {
                    if (i in title) {
                        tmp.title = title[i];
                    }
                }
                if(content !== null) {
                    if (i in content) {
                        tmp.content = content[i];
                    }
                }
                if(markerIcon !== null) {
                    if (i in markerIcon) {
                        tmp.marker = markerIcon[i];
                    } else tmp.marker = markerIcon[0];
                }
                data.points.push(tmp);
            });
            return data;
        }
        return null;
    }

    const getMapCenter = (points) =>{
        let center = {
            lat: 0,
            lng: 0
        };
        points.forEach(point => {
            center.lat += point.lat;
            center.lng += point.lng;
        });
        center.lat = center.lat/points.length;
        center.lng = center.lng/points.length;
        return center;
    }

    let maps = document.querySelectorAll('.js-map');
    if(maps.length > 0){
        maps.forEach(mapElement => {
            let mapPoints = preparePoints(mapElement);
            if(mapPoints !== null){
                let mapOptions = {
                    center: getMapCenter(mapPoints.points),
                    zoom: mapPoints.zoom,
                    scrollwheel: false,
                    scaleControl: false,
                    disableDefaultUI: false,
                }
                let map = new google.maps.Map(mapElement, mapOptions);
                mapPoints.points.forEach(point => {
                   let markerOptions = {
                       position: {lat: point.lat, lng: point.lng},
                       map: map
                   };
                   if('marker' in point){
                       markerOptions.icon = point.marker;
                   }
                   if('title' in point){
                       markerOptions.title = point.title;
                   }
                   let marker = new google.maps.Marker(markerOptions);
                   if('content' in point){
                       let infoWindow = new google.maps.InfoWindow({
                           content: point.content
                       });
                       marker.addListener('click', () => {
                           infoWindow.open(map, marker);
                       });
                   }
                });
            } else {
                console.log('Niezgodna ilość punktów do naniesienia na mapę.');
                mapElement.innerHTML = "<p style='text-align: center; line-height:500px ; font-size:40px; margin: 0;' >Przepraszamy, nie możemy wyświetlić mapy</p>";
            }
        });
    }
};

export default initMap;