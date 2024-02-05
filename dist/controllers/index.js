"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secundaria = exports.primeira = void 0;
const express_validator_1 = require("express-validator");
const primeira = (req, res) => {
    res.render('principal');
};
exports.primeira = primeira;
const secundaria = (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        const tag = req.body.tag;
        const tagurl = encodeURIComponent(`#${tag}`);
        fetch(`https://api.clashroyale.com/v1/players/${tagurl}/battlelog`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU4MjVjYTFjLTY1YTMtNDFiYS1iY2U4LTYzYTMxOGY0ZTY3YSIsImlhdCI6MTcwNjkyMzAzOCwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS4yMzUuNDYuMjQ5Il0sInR5cGUiOiJjbGllbnQifV19.4xSVdKFpw-LUjv2b1y7pefL11fsbutTAqW7EGAPSdvogyCbor-_mDH6dBQI5uDHGuDghL24W1VU9LQByWaPWlQ"
            }
        })
            .then(res => res.json())
            .then((dadosBattlelog) => {
            fetch(`https://api.clashroyale.com/v1/players/${tagurl}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU4MjVjYTFjLTY1YTMtNDFiYS1iY2U4LTYzYTMxOGY0ZTY3YSIsImlhdCI6MTcwNjkyMzAzOCwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS4yMzUuNDYuMjQ5Il0sInR5cGUiOiJjbGllbnQifV19.4xSVdKFpw-LUjv2b1y7pefL11fsbutTAqW7EGAPSdvogyCbor-_mDH6dBQI5uDHGuDghL24W1VU9LQByWaPWlQ"
                }
            })
                .then(res => res.json())
                .then(dadosUser => {
                return res.render('secundaria', { dadosBattlelog, dadosUser });
            })
                .catch(err1 => console.log('erro no fetch de dentro---->' + err1));
        })
            .catch(err => console.log('erro no fetch de fora'));
        return;
    }
    res.send({ errors: result.array() });
};
exports.secundaria = secundaria;
