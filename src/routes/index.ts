import { Router } from "express";
import { query } from "express-validator";
import * as controllers from '../controllers/index';

const router = Router();

router.get('/', controllers.primeira);

router.get('/jogador', query('tag').notEmpty().isLength({max:9,min:8}), controllers.secundaria);

router.get('/jogador/batalhas', query('tag').notEmpty().isLength({max:9,min:8}), controllers.batalhas );



router.get('/teste', (req, res)=>{
    const tagurl = encodeURIComponent(`#8QL98Q2L`);
    fetch(`https://api.clashroyale.com/v1/players/${tagurl}/battlelog`, {
            headers: {
                "Content-Type": "application/json",
                "cache-control": "public max-age=600",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImFiMGU0YzI4LTJkODYtNGZkMS1hZGI0LTZlNDgyODliZTFkYiIsImlhdCI6MTcwOTg2MTY0MCwic3ViIjoiZGV2ZWxvcGVyLzcwYmY0YjNhLTIzMDUtZWRmZS0zYjZmLWYyZDE2M2M3ZWM3ZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzkuMTA2LjE0LjI0NCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.RVpwWjaKJlgP7EbrhVC2QfgrnurJUWsUstMVGZ2n9O1Z6v_fY8PzN-Z3IOnz3yWKZvrhGKaPyquqxAMnuid96A"
            }
        })
            .then(res => res.json())
            .then(dadosUser => {
                let deck = new Array();
                dadosUser.forEach((element: any) => {
                    element.opponent.forEach((element:any) => {
                        deck.push(element.cards); 
                        console.log(element.cards);
                    });
                });
                return res.send(dadosUser);
            })
            .catch(err => res.send(err));
        return;
})

export default router;