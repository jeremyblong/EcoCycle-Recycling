const express = require("express");
const router = express.Router();
const config = require("config");
const { Connection } = require("../../../mongoUtil.js");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const moment = require("moment");

router.post("/", (req, resppppp) => {

    const { freightData, userData, earliestTime, latestTime, calculatedDateMain } = req.body;

    console.log("req.body", req.body);

    const { addressRawData, relevantImagesOfFreight } = freightData;

    const { 
      zipCode,
      regionState,
      city,
      addressLineOneStreetNameOnly,
      addressLineOneStreetNumOnly,  
      aptSuiteRoomNumber
    } = addressRawData;
    
    const {
      minEstLoadWeight,
      maxEstLoadWeight,
      loadLocationDescription,
      palletGeneralLocation,
      descriptionOfCommodity
    } = freightData.loadInfo;


    const helperImagesPickup = [];

    for (let idxxxxx = 0; idxxxxx < relevantImagesOfFreight.length; idxxxxx++) {
      const image = relevantImagesOfFreight[idxxxxx];

      helperImagesPickup.push(image); 
    }
    const helperImagesPickupStr = helperImagesPickup.toString();

    const collection = Connection.db.db("test").collection("users");

    const generatedTrackingNum = uuidv4().replaceAll('-', '').slice(0, 15);

    collection.findOne({ uniqueId: userData.uniqueId }).then((user) => {
      if (!user) {
          resppppp.json({
              message: "An error occurred while attempting to update DB information & request the freight information..."
          })
      } else {
        const userMessageToDriver = "Thank you for your dedication & hard work - I appreciate you picking this order up, your work is appreciated. Thanks!!";
        const descDelivery = "Please call upon arriving (+1 (980)-800-6253) or our ElectraCycle support line for our freight delivery drivers to orchastrate a dropoff through our warehouse. We DO have loading docks and will assist in delivery!";
        const customStringCombined = `Load Description: ${loadLocationDescription} \n \n \n Pallet General Location: ${palletGeneralLocation} \n`;
        const personalMsgStr = `Pickup Instructions: ${customStringCombined} \n\nPictures To Assist Pickup: ${helperImagesPickupStr} \n\nHandling Instructions: "Load palleted freight item on carrier - please BE ADVISED you will NEED a loading mechanism to get the freight onto your truck/carrier. Any ways/means is fine but note it will be required." \n\nDelivery Instructions: "Please call upon arriving (+1 (980)-800-6253) or our ElectraCycle support line for our freight delivery drivers to orchastrate a dropoff through our warehouse. We DO have loading docks and will assist in delivery!" \n\nDelivery Desc: ${descDelivery}`

        const addressValidation = {
          "address_line1": "1075 N Tustin Street",
          "city_locality": "Orange",
          "state_province": "CA",
          "postal_code": "92863",
          "country_code": "US"
        };

        axios.post("https://api.shipengine.com/v1/addresses/validate", [addressValidation], {
          headers: {
            "API-Key": config.get("shipEngineSandboxAPI"),
            "Content-Type": "application/json"
          }
        }).then((ressssssss) => {

          console.log("ressssssss.data", ressssssss.data);

          const { data } = ressssssss;

          const addressData = data[0].matched_address;

          if (data[0].status === "verified") {
            const requestPickupDataCore = {
              "shipment": {
                "service_code": "fedex_3_day_freight",
                "carrier_id": "se-3431191",
                "tracking_number": generatedTrackingNum,
                "ship_to": {
                  "name": "Jeremy A. Blong",
                  "address_line1": "3202 Wilkinson Blvd",
                  "city_locality": "charlotte",
                  "state_province": "nc",
                  "postal_code": "28208",
                  "country_code": "US",
                  "address_residential_indicator": "yes"
                },
                "ship_from": {
                  "name": `${user.firstName} ${user.lastName}`,
                  "company_name": "ElectraCycle E-Waste Management",
                  "phone": user.phone,
                  "address_line1": addressData.address_line1,
                  "city_locality": addressData.city_locality,
                  "state_province": addressData.state_province,
                  "postal_code": addressData.postal_code,
                  "country_code": addressData.country_code,
                  "address_residential_indicator": "yes"
                },
                "packages": [
                  {
                    "weight": {
                      "value": Math.floor((Number(minEstLoadWeight) + Number(maxEstLoadWeight)) / 2),
                      "unit": "pound"
                    },
                    "dimensions": {
                      "height": 48,
                      "width": 40,
                      "length": 30,
                      "unit": "inch"
                    }
                  }
                ]
              }
            }

            axios.post("https://api.shipengine.com/v1/labels", requestPickupDataCore, {
              headers: {
                "API-Key": config.get("shipEngineSandboxAPI"),
                "Content-Type": "application/json"
              }
            }).then((ressss) => {
    
              console.log("ressss.data", ressss.data);
    
              const { data } = ressss;
    
              resppppp.json({
                message: "Successfully requested shipment and processed logic!",
                data
              })
            }).catch((errrrrror) => {
                console.log("critical errorerrrrrror", errrrrror.response.data);

                resppppp.json({
                  message: "An error occurred while attempting to update DB information & request the freight information...",
                  err: errrrrror
                })
            })
          } else {
            resppppp.json({
              message: "Could NOT verify/validate the address provided...",
              err: null
            })
          }
        }).catch((errrrrror) => {
            console.log("critical errorerrrrrror", errrrrror.response.data);

            resppppp.json({
              message: "An error occurred while attempting to update DB information & request the freight information...",
              err: errrrrror
            })
        })
      }
    }).catch((err) => {
      console.log("Errrrrrrrrrrr main...:", err);

      resppppp.json({
        message: "An error occurred while attempting to update DB information & request the freight information...",
        err
      })
  })
});

module.exports = router;

// ups - se-3431190
// fedex - se-3431191