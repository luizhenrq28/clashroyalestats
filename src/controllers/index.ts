import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

// declare module 'express-session' {
//     interface SessionData {
//         dados: any,
//         verificaSequencia: boolean;
//     }
// }

const primeira = (_: any, res: Response) => {
    res.render('principal');
}

const secundaria = (req: Request, res: Response) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        const tag = req.body.tag;
        const tagurl = encodeURIComponent(`#${tag}`);

        fetch(`https://api.clashroyale.com/v1/players/${tagurl}/battlelog`, {
            headers: {
                "Content-Type": "application/json",
                "cache-control": "public max-age=600",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk2OTg4ZTc2LWFiNGItNGU4NS04ODg5LTc4NDgxYTQ5MGE2MyIsImlhdCI6MTcwOTUxNzA5MSwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzkuMTA2LjE0LjI0NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.lgrk7lH-BWfRDanagAHwX_uJeVMpvnm0-2o5mES7PwWIoLr99t18RBVB5N3RAxmNQVdeEiYFwI7YNEYpet4fXA"
            }
        })
            .then(res => res.json())
            .then((dadosBattlelog) => {
                fetch(`https://api.clashroyale.com/v1/players/${tagurl}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "cache-control": "public max-age=600",
                        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk2OTg4ZTc2LWFiNGItNGU4NS04ODg5LTc4NDgxYTQ5MGE2MyIsImlhdCI6MTcwOTUxNzA5MSwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzkuMTA2LjE0LjI0NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.lgrk7lH-BWfRDanagAHwX_uJeVMpvnm0-2o5mES7PwWIoLr99t18RBVB5N3RAxmNQVdeEiYFwI7YNEYpet4fXA"
                    }
                })
                    .then(res => res.json())
                    .then(dadosUser => {
                        return res.render('secundaria', {dadosBattlelog, dadosUser});
                    })
                    .catch(err => console.log('erro no fetch de dentro---->' + err));
            })
            .catch(err => console.log('erro no fetch de fora----->+' + err));
        return;
    }

    res.send({ errors: result.array()[0].msg });
}

export { primeira, secundaria };