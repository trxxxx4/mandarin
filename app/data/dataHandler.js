import { deleteReq, getReq, postReq } from "../data/cardsData"

export const loadTokenData = async () =>{
            const data = await getReq()
            console.log(data)
            return data
}