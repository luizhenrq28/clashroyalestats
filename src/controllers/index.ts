import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import 'dotenv/config';

const primeira = (_: any, res: Response) => {
    res.render('principal');
}

const secundaria = (req: Request, res: Response) => {
    const result = validationResult(req);

    //tela com infos jogador
    if (result.isEmpty()) {
        const tag = req.query.tag;
        const tagurl = encodeURIComponent(`#${tag}`);
        fetch(`https://api.clashroyale.com/v1/players/${tagurl}`, {
            headers: {
                "Content-Type": "application/json",
                "cache-control": "public max-age=600",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImFiMGU0YzI4LTJkODYtNGZkMS1hZGI0LTZlNDgyODliZTFkYiIsImlhdCI6MTcwOTg2MTY0MCwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzkuMTA2LjE0LjI0NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.RVpwWjaKJlgP7EbrhVC2QfgrnurJUWsUstMVGZ2n9O1Z6v_fY8PzN-Z3IOnz3yWKZvrhGKaPyquqxAMnuid96A"
            }
        })
            .then(res => res.json())
            .then(dadosUser => {
                return res.render('secundaria', { dadosUser, tag });
            })
            .catch(err => res.send(err));
        return;
    }

    res.send({ errors: result.array()[0].msg });
}

const batalhas = (req: Request, res: Response) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        //tela com infos jogador + batalhas
        const tag = req.query.tag;
        const tagurl = encodeURIComponent(`#${tag}`);
        
        const pag = req.query.pag === '1' || req.query.pag === '2' ? req.query.pag : '1';

        fetch(`https://api.clashroyale.com/v1/players/${tagurl}/battlelog`, {
            headers: {
                "Content-Type": "application/json",
                "cache-control": "public max-age=600",
                "Authorization": `${process.env.token}`
            }
        })
            .then(res => res.json())
            .then((dadosBattlelog) => {
                fetch(`https://api.clashroyale.com/v1/players/${tagurl}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "cache-control": "public max-age=600",
                        "Authorization": `${process.env.token}`
                    }
                })
                    .then(res => res.json())
                    .then(dadosUser => {
                        let inicio = (Number(pag) - 1) * 13;
                        let fim = inicio + 13;
                        const dadosPaginado = dadosBattlelog.slice(inicio, fim);

                        return res.render('batalhas', { dadosPaginado, dadosUser, tag });
                    })
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
        return;
    }

    res.send({ errros: result.array()[0].msg })
}

export { primeira, secundaria, batalhas };