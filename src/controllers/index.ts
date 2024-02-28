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
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVlNDZiODdmLTY4ZjMtNDkwZS04ZDBiLTI1YjZmZDQ1M2M4NCIsImlhdCI6MTcwOTA4NTA3OSwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS4yMzUuNDYuMjQ5Il0sInR5cGUiOiJjbGllbnQifV19.B2fcN9PaIooeSu8voAd_qopgXPIG4fxJHlHQUIlXrhIHzwO8i8Vu9vWp4FnJF5rAPc0-NHMXrYJrqtOYdZGtOQ"
            }
        })
            .then(res => res.json())
            .then((dadosBattlelog) => {
                fetch(`https://api.clashroyale.com/v1/players/${tagurl}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVlNDZiODdmLTY4ZjMtNDkwZS04ZDBiLTI1YjZmZDQ1M2M4NCIsImlhdCI6MTcwOTA4NTA3OSwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS4yMzUuNDYuMjQ5Il0sInR5cGUiOiJjbGllbnQifV19.B2fcN9PaIooeSu8voAd_qopgXPIG4fxJHlHQUIlXrhIHzwO8i8Vu9vWp4FnJF5rAPc0-NHMXrYJrqtOYdZGtOQ"
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