const express = require("express");
const router = express.Router();
const config = require("config");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: config.get("openAIApiKey")
});

router.post("/", async (req, resppppp) => {

    const { cartData, uniqueId } = req.body;

    console.log("cartData cartData cartData ", cartData);

    const gramsToPounds = (grams) => {
        const pounds = grams * 0.00220462;
        return pounds;
    }

    const kgToPounds = (kg) => {
        const pounds = kg * 2.20462;
        return pounds;
    }
    
    const findWeightKeys = (obj, weightValues) => {
        Object.keys(obj).forEach(key => {
            if (key.toLowerCase().includes("weight")) {
                console.log("key", obj[key], key)
                switch (key) {
                    case "Weight (g)":
                        const grams = Math.round(Number(obj[key])); // example weight in grams
                        const pounds = gramsToPounds(grams);
                        weightValues.push(`${Number(pounds)} lb`);
                        break;
                    case "Weight (without stand)":
                        console.log("Weight (without stand)", obj[key]);
                        weightValues.push(obj[key]);
                        break;
                    case "Weight (kg)":
                        console.log("Weight (kg)", obj[key]);
                        weightValues.push(`${kgToPounds(obj[key])} lb`);
                        break;
                    default:
                        // weightValues.push(Math.round(Number(obj[key])));
                        break;
                }
            } else if (key.toLowerCase().includes("category")) {
                console.log("key", key);
                let size = "13";
                switch (obj[key]) { // Size
                    case "laptops":
                        if (obj[key].includes("15")) {
                            size = "15";
                        } else if (obj[key].includes("17")) {
                            size = "17";
                        }
                        weightValues.push(`${size === "13" ? 3 : size === "15" ? 4.5 : 5.5} lb`);
                        break;
                    default:
                        // weightValues.push(Math.round(Number(JSON.parse(obj)[key])));
                        break;
                }
            }
        });
        return weightValues;
    };    
    
    const promiseee = new Promise((resolve, reject) => {
        let weightValues = [];

        for (let index = 0; index < cartData.length; index++) {
            const cartinformation = cartData[index];

            // console.log("cartinformation", cartinformation);

            findWeightKeys(cartinformation, weightValues);

            if ((cartData.length - 1) === index) {
                console.log("cartinformation.weightKeys", weightValues);

                resolve(weightValues);
            } 
        };
    })

    promiseee.then(async (passedValues) => {
        console.log("passedValues", passedValues);

        const targetUnit = "kg";

        const prompt = `
        I have an array of weights in different units. Please convert all weights to a specified target unit. The array of weights is given in various formats such as '260g', '10kg', '5.5lb', '300mg', '2t', etc. The target unit can be grams (g), kilograms (kg), pounds (lb), ounces (oz), milligrams (mg), or tons (t). The output should be an array of converted weights in the specified target unit.
    
        Input:
        Array of weights: ${JSON.stringify(passedValues)}
        Target unit: ${targetUnit}
    
        Output:
        Array of converted weights in ${targetUnit}:
    
        Please provide the output in the same format as the examples above.`
    
        const complete = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt,
            max_tokens: 3750,
            temperature: 0,
            n: 1,
            user: uniqueId
        });
        
        console.log("complete ------ :", complete);
    
        const { choices } = complete;

        const extractArray = (str) => {
            // Remove leading/trailing whitespace and extract the array part
            const trimmedStr = str.trim();
            const arrayStr = trimmedStr.replace(/^text: '|\n|'/g, '').trim();
          
            // Parse the array string into a JavaScript array
            const array = JSON.parse(arrayStr);
            return array;
        };
        
        const array = extractArray(choices[0].text);

        const convertToKg = (weight) => {
            const [value] = weight.split(' ');
            return parseFloat(value);
        };
          
        const totalWeightKg = array.reduce((total, weight) => total + convertToKg(weight), 0);
    
        console.log("totalWeightKg", totalWeightKg);

        resppppp.json({
            message: "Successfully processed the desired data and calculated weight!",
            choices,
            choice: array,
            complete,
            totalWeightKg
        })
    })
});

module.exports = router;