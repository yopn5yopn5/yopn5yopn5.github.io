var CHU = {
    lat: 24.760003792402095,
    lng: 120.95301095542392,
  };
  var merged = [];
  
  function initMap() {
    function initMarker(v) {
      // console.log(v);
      if (v.TheDailyDomesticConsumptionOfWaterPerPerson === undefined) {
        v.TheDailyDomesticConsumptionOfWaterPerPerson = "沒有此縣市的用水量資料";
      } else {
        v.TheDailyDomesticConsumptionOfWaterPerPerson =
          v.TheDailyDomesticConsumptionOfWaterPerPerson + "L";
      }
  
      new google.maps.Marker({
        position: {
          lat: v.Lat,
          lng: v.Lng,
        },
        map,
        title: `縣市：${v.City}\n鄉鎮：${v.District}\n用水量：${v.TheDailyDomesticConsumptionOfWaterPerPerson}`,
        animation: google.maps.Animation.DROP,
      });
    }
  
    let map = new google.maps.Map(document.getElementById("map"), {
      center: CHU,
      zoom: 8,
    });
    new google.maps.Marker({
      position: CHU,
      map,
      title: `這裡是中華大學`,
      animation: google.maps.Animation.DROP,
    });
  
    merged.forEach((element) => {
      initMarker(element);
    });
  }
  area.forEach((element) => {
    if (element.City === "臺北市") {
      element.City = "台北市";
    }
  });
  
  for (let i = 0; i < area.length; i++) {
    merged.push({
      ...area[i],
      ...water.find(
        (item) => item.County === area[i].City && item.Town === area[i].District
      ),
    });
  }
  
  initMap();