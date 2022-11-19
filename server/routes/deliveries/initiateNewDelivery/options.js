const realBodyData = {
    "freightRequestedShipment": {
      "shipDatestamp": calculatedDateMain,
      "pickupType": "USE_SCHEDULED_PICKUP",
      "serviceType": "FEDEX_FREIGHT_ECONOMY",
      "packagingType": "PALLETED_FREIGHT_CONTAINER",
      "totalWeight": Math.floor((Number(minEstLoadWeight) + Number(maxEstLoadWeight)) / 2),
      "preferredCurrency": "USD",
      "shipper": {
        "address": {
          "streetLines": [
            `${addressLineOneStreetNumOnly} ${addressLineOneStreetNameOnly}`,
            aptSuiteRoomNumber
          ],
          "city": city,
          "stateOrProvinceCode": regionState,
          "postalCode":  zipCode.split("-")[0],
          "countryCode": "US",
          "residential": true
        },
        "contact": {
          "personName": `${user.firstName} ${user.lastName}`,
          "emailAddress": user.email,
          "phoneNumber": user.phone,
          "phoneExtension": "1",
          "companyName": "Fedex",
          "faxNumber": "N/A",
          "stateTaxId": "N/A",
          "fedralTaxId": "N/A"
        }
      },
      "recipient": {
        "address": {
          "streetLines": [
            "2404 brelade place"
          ],
          "city": "Charlotte",
          "stateOrProvinceCode": "NC",
          "postalCode": "28203",
          "countryCode": "US",
          "residential": true
        },
        "contact": {
          "personName": "Jeremy Blong",
          "emailAddress": "blongjeremy@gmail.com",
          "phoneNumber": "9808006253",
          "phoneExtension": "1",
          "companyName": "Fedex",
          "faxNumber": "N/A",
          "stateTaxId": "N/A",
          "fedralTaxId": "N/A"
        },
        "deliveryInstructions": "Please call upon arriving (+1 (980)-800-6253) or our ElectraCycle support line for our freight delivery drivers to orchastrate a dropoff through our warehouse. We DO have loading docks and will assist in delivery!"
      },
      "origin": {
        "address": {
          "streetLines": [
            `${addressLineOneStreetNumOnly} ${addressLineOneStreetNameOnly}`,
            aptSuiteRoomNumber
          ],
          "city": city,
          "stateOrProvinceCode": regionState,
          "postalCode":  zipCode.split("-")[0],
          "countryCode": "US",
          "residential": true
        },
        "contact": {
          "personName": `${user.firstName} ${user.lastName}`,
          "emailAddress": user.email,
          "phoneNumber": user.phone,
          "phoneExtension": "1",
          "companyName": "N/A",
          "faxNumber": "N/A"
        }
      },
      "shippingChargesPayment": {
        "paymentType": "THIRD_PARTY",
        "payor": {
          "responsibleParty": {
            "address": {
              "streetLines": [
                "2404 brelade place",
              ],
              "city": "Charlotte",
              "stateOrProvinceCode": "NC",
              "postalCode": "28203",
              "countryCode": "US",
              "residential": true
            },
            "contact": {
              "personName": "Jeremy Blong",
              "emailAddress": "blongjeremy@gmail.com",
              "phoneNumber": "9808006253",
              "phoneExtension": "1",
              "companyName": "ElectraCycle",
              "faxNumber": "N/A",
              "stateTaxId": "N/A",
              "fedralTaxId": "N/A"
            },
            "accountNumber": {
              "value": config.get("fedexFreightShipperAccountNumber")
            }
          }
        },
        "billingDetails": {
          "billingCode": "28203",
          "billingType": "Defferred",
          "aliasId": "aliasId",
          "accountNickname": "Jeremy A. Blong (ElectraCycle)",
          "accountNumber": config.get("fedexFreightShipperAccountNumber"),
          "accountNumberCountryCode": "US"
        }
      },
      "freightShipmentSpecialServices": {
        "specialServiceTypes": [
          "THIRD_PARTY_CONSIGNEE",
          "PROTECTION_FROM_FREEZING"
        ],
        "freightGuaranteeDetail": {
          "freightGuaranteeType": "GUARANTEED_DATE",
          "guaranteeTimestamp": moment(new Date()).add(30, 'days').format("YYYY-MM-DD")
        }
      },
      "emailNotificationDetail": {
        "aggregationType": "PER_PACKAGE",
        "emailNotificationRecipients": [
          {
            "name": "Jeremy Blong",
            "emailNotificationRecipientType": "SHIPPER",
            "emailAddress": "blongjeremy@gmail.com",
            "notificationFormatType": "TEXT",
            "notificationType": "EMAIL",
            "locale": "en_US",
            "notificationEventType": [
              "ON_PICKUP_DRIVER_ARRIVED",
              "ON_SHIPMENT"
            ]
          }
        ],
        "personalMessage": personalMsgStr
      },
      "freightShipmentDetail": {
        "role": "CONSIGNEE",
        "fedExFreightAccountNumber": {
          "value": config.get("fedexFreightShipperAccountNumber")
        },
        "declaredValueUnits": "KG",
        "printedReferences": [
          {
            "printedReferenceType": "BILL_OF_LADING",
            "value": "1"
          }
        ],
        "hazardousMaterialsEmergencyContactNumber": {
          "areaCode": "980",
          "localNumber": "8006253",
          "extension": "1",
          "countryCode": "US",
          "personalIdentificationNumber": "N/A"
        },
        "lineItem": [
          {
            "handlingUnits": 1,
            "nmfcCode": "nmfcCode",
            "subPackagingType": "PALLET",
            "description": descriptionOfCommodity,
            "weight": {
              "units": "KG",
              "value": Math.floor((Number(minEstLoadWeight) + Number(maxEstLoadWeight)) / 2)
            },
            "pieces": 1,
            "volume": {
              "units": "CUBIC_FT",
              "value": 22.5
            },
            "freightClass": "CLASS_050",
            "purchaseOrderNumber": purchaseOrderNumber,
            "id": uuidv4().split("-")[0],
            "hazardousMaterials": "N/A",
            "dimensions": {
              "length": 48,
              "width": 40,
              "height": 30,
              "units": "IN"
            },
            "classProvidedByCustomer": true
          }
        ],
        "fedExFreightBillingContactAndAddress": {
          "address": {
            "streetLines": [
              "2404 brelade place",
            ],
            "city": "Charlotte",
            "stateOrProvinceCode": "NC",
            "postalCode": "28203",
            "countryCode": "US",
            "residential": true
          },
          "contact": {
            "personName": "Jeremy A Blong",
            "emailAddress": "blongjeremy@gmail.com",
            "phoneNumber": "9808006253",
            "phoneExtension": "1",
            "companyName": "ElectraCycle E-Waste Managment",
            "faxNumber": "N/A"
          }
        },
        "labelSpecification": {
          "labelFormatType": "COMMON2D",
          "labelOrder": "SHIPPING_LABEL_LAST",
          "customerSpecifiedDetail": {
            "maskedData": [
              "[\"CUSTOMS_VALUE\",\"TOTAL_WEIGHT\"]"
            ],
            "regulatoryLabels": [
              {
                "generationOptions": "CONTENT_ON_SHIPPING_LABEL_ONLY",
                "type": "ALCOHOL_SHIPMENT_LABEL"
              }
            ],
            "additionalLabels": [
              {
                "type": "CONSIGNEE",
                "count": 1
              }
            ],
            "docTabContent": {
              "docTabContentType": "BARCODED",
              "zone001": {
                "docTabZoneSpecifications": [
                  {
                    "zoneNumber": 0,
                    "header": "string",
                    "dataField": "string",
                    "literalValue": "string",
                    "justification": "RIGHT"
                  }
                ]
              },
              "barcoded": {
                "symbology": "UCC128",
                "specification": {
                  "zoneNumber": 0,
                  "header": "string",
                  "dataField": "string",
                  "literalValue": "string",
                  "justification": "RIGHT"
                }
              }
            }
          },
          "printedLabelOrigin": {
            "address": {
              "streetLines": [
                `${addressLineOneStreetNumOnly} ${addressLineOneStreetNameOnly}`,
                aptSuiteRoomNumber
              ],
              "city": city,
              "stateOrProvinceCode": regionState,
              "postalCode":  zipCode.split("-")[0],
              "countryCode": "US",
              "residential": true
            },
            "contact": {
              "personName": `${user.firstName} ${user.lastName}`,
              "emailAddress": user.email,
              "phoneNumber": user.phone,
              "phoneExtension": "1",
              "companyName": "company name",
              "faxNumber": "fax number"
            }
          },
          "labelStockType": "PAPER_85X11_TOP_HALF_LABEL",
          "labelRotation": "UPSIDE_DOWN",
          "imageType": "PDF",
          "labelPrintingOrientation": "TOP_EDGE_OF_TEXT_FIRST",
          "returnedDispositionDetail": true
        },
        "aliasID": user.uniqueId,
        "collectTermsType": "NON_RECOURSE_SHIPPER_SIGNED",
        "hazardousMaterialsOfferor": "offeror",
        "totalHandlingUnits": 1
      },
      "totalPackageCount": 1
    },
    "requestedPackageLineItems": [
      {
        "sequenceNumber": "1",
        "subPackagingType": "BUCKET",
        "customerReferences": [
          {
            "customerReferenceType": "INVOICE_NUMBER",
            "value": "N/A"
          }
        ],
        "declaredValue": {
          "amount": 275,
          "currency": "USD"
        },
        "weight": {
          "units": "KG",
          "value": Math.floor((Number(minEstLoadWeight) + Number(maxEstLoadWeight)) / 2)
        },
        "dimensions": {
          "length": 48,
          "width": 40,
          "height": 32.5,
          "units": "IN"
        },
        "physicalPackaging": "class line",
        "itemDescriptionForClearance": "description",
        "contentRecord": [],
        "itemDescription": descriptionOfCommodity,
        "associatedFreightLineItems": [
          {
            "id": uuidv4().split("-")[0]
          }
        ]
      }
    ],
    "labelResponseOptions": "LABEL",
    "accountNumber": {
      "value": config.get("fedexFreightShipperAccountNumber")
    }
  }

  const requestPickupData = {
    "associatedAccountNumber": {
      "value": config.get("fexexFreightBillToAccountNumber")
    },
    "originDetail": {
      "pickupAddressType": "ACCOUNT",
      "pickupLocation": {
        "contact": {
          "companyName": "ElectraCycle E-Waste Management",
          "personName": `${user.firstName} ${user.lastName}`,
          "phoneNumber": user.phone,
          "phoneExtension": "+1"
        },
        "address": {
          "streetLines": [
            `${addressLineOneStreetNumOnly} ${addressLineOneStreetNameOnly}`,
            aptSuiteRoomNumber
          ],
          "city": city,
          "stateOrProvinceCode": regionState,
          "postalCode":  zipCode.split("-")[0],
          "countryCode": "US",
          "residential": true,
          "addressClassification": "MIXED"
        },
        "accountNumber": {
          "value": config.get("fexexFreightBillToAccountNumber")
        },
        "deliveryInstructions": descDelivery
      },
      "readyDateTimestamp": new Date(dateSelected),
      "customerCloseTime": formattedLatestPickup,
      "pickupDateType": "SAME_DAY",
      "packageLocation": "FRONT",
      "buildingPart": "BUILDING",
      "buildingPartDescription": aptSuiteRoomNumber,
      "earlyPickup": false,
      "suppliesRequested": suppliesRequestedStr,
      "geographicalPostalCode": zipCode
    },
    "associatedAccountNumberType": "FEDEX_FREIGHT",
    "totalWeight": {
      "units": "LB",
      "value": Math.floor((Number(minEstLoadWeight) + Number(maxEstLoadWeight)) / 2)
    },
    "packageCount": 1,
    "carrierCode": "FDXG",
    "accountAddressOfRecord": {
      "streetLines": [
        "2404 brelade place"
      ],
      "city": "charlotte",
      "stateOrProvinceCode": "nc",
      "postalCode":  "28203",
      "countryCode": "US",
      "residential": true,
      "addressClassification": "MIXED"
    },
    "remarks": personalMsgStr,
    "countryRelationships": "DOMESTIC",
    "pickupType": "ON_CALL, PACKAGE_RETURN_PROGRAM, REGULAR_STOP.",
    "trackingNumber": generatedTrackingNum,
    "commodityDescription": descriptionOfCommodity,
    "expressFreightDetail": {
      "truckType": "LIFTGATE",
      "service": "FEDEX_1_DAY_FREIGHT",
      "trailerLength": "TRAILER_28_FT",
      "dimensions": {
        "length": 48,
        "width": 40,
        "height": 30,
        "units": "IN"
      }
    },
    "oversizePackageCount": 1,
    "pickupNotificationDetail": {
      "emailDetails": [
        {
          "address": "blongjeremy@gmail.com",
          "locale": "en_US"
        }
      ],
      "format": "TEXT",
      "userMessage": userMessage
    }
  }
  const feightLTLconfig = {
    "carrier": {
        "test": true,
          "instructions": personalMsgStr
        },
    "options": [
      {
        "code": "HAZ",
        "attributes": {
          "name": "Jeremy Blong - ElectraCycle E-Waste Managment",
          "phone": "9808006253"
        }
      }
    ],
    "reference_identifiers": [
      {
      "type": "pro_number",
      "value": "1234574"
      }
    ],
    "shipment": {
        "pickup_date": moment(new Date(calculatedDateMain)).format("YYYY-MM-DD"),
        "pickup_window": {
        "start_at": formattedEarliestPickup,
        "end_at": formattedLatestPickup,
        "closing_at": formattedLatestPickup
      },
      "delivery_date": moment(new Date(calculatedDateMain)).add("2", "w").format("YYYY-MM-DD"),
      "service_code": "stnd",
      "bill_to": {
        "account": "123456",
        "address": {
          "address_line1": "2404 brelade place",
          "city_locality": "charlotte",
          "company_name": "ElectraCycle Waste Management",
          "country_code": "US",
          "postal_code": "28203",
          "state_province": "NC"
        },
        "contact": {
          "email": "blongjeremy@gmail.com",
          "name": "ElectraCycle Waste Management",
          "phone_number": "980-800-6253"
        },
        "payment_terms": "prepaid",
        "type": "third_party"
      },
      "packages": [
        {
          "code": "PKG",
          "description": descriptionOfCommodity,
          "dimensions": {
            "height": 40,
            "length": 48,
            "unit": "inches",
            "width": 40
          },
          "freight_class": 60,
          "hazardous_materials": false,
          "nmfc_code": "161630",
          "quantity": 1,
          "stackable": false,
          "weight": { "unit": "pounds", "value": Math.floor((Number(minEstLoadWeight) + Number(maxEstLoadWeight)) / 2) }
        }
      ],
      "requested_by": {
        "company_name": "ElectraCycle E-Waste Management",
        "contact": {
          "email": "blongjeremy@gmail.com",
          "name": "Jeremy Blong",
          "phone_number": "980-800-6253"
        }
      },
      "ship_from": {
        "account": "123456",
        "address": {
          "address_line1": `${addressLineOneStreetNumOnly} ${addressLineOneStreetNameOnly}`,
          "address_line2": aptSuiteRoomNumber,
          "city_locality": city,
          "state_province": regionState,
          "postal_code": zipCode.split("-")[0],
          "country_code": "US"
        },
        "contact": {
          "email": user.email,
          "name": `${user.firstName} ${user.lastName}`,
          "phone_number": user.phone
        }
      },
      "ship_to": {
        "account": "123456",
        "address": {
          "address_line1": "951 20th St",
          "city_locality": "denver",
          "state_province": "co",
          "postal_code": "80202",
          "country_code": "US"
        },
        "contact": {
          "email": "blongjeremy@gmail.com",
          "name": "Jeremy Blong",
          "phone_number": "980-800-6253"
        }
      }
    }
  };

  const requestPickupDataCore = {
    "shipment": {
      "service_code": "fedex_3_day_freight",
      "carrier_id": "se-3431191",
      "tracking_number": generatedTrackingNum,
      "ship_to": {
        "name": "Jeremy A. Blong",
        "address_line1": "951 20th St",
        "city_locality": "denver",
        "state_province": "co",
        "postal_code": "80202",
        "country_code": "US",
        "address_residential_indicator": "yes"
      },
      "ship_from": {
        "name": `${user.firstName} ${user.lastName}`,
        "company_name": "ElectraCycle E-Waste Management",
        "phone": user.phone,
        "address_line1": `${addressLineOneStreetNumOnly} ${addressLineOneStreetNameOnly}`,
        "address_line2": aptSuiteRoomNumber,
        "city_locality": city,
        "state_province": regionState,
        "postal_code": zipCode.split("-")[0],
        "country_code": "US",
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
            "length": 32,
            "unit": "inch"
          }
        }
      ]
    }
  }