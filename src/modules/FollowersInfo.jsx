import { useState, useEffect } from 'react'
import '../styles/FollowersInfo.css'
function FollowersInfo({ json1, json2 }) {
    const [doesNotFollowBack, setDoesNotFollowBack] = useState([]);
    const [isFan, setIsFan] = useState([]);
    const [isFollowing, setIsFollowing] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Leer los archivos JSON
                // const response1 = await fetch("/src/json/following.json");
                // const response2 = await fetch("/src/json/followers_1.json");

                //Parsear los archivos JSON
                const list1 = json1;
                const list2 = json2
                console.log(list1)
                console.log(list2)
                //Filtrar los elementos que no siguen de vuelta
                let unique = list1.relationships_following.filter(item1 =>
                    !list2.some(item2 => item2.string_list_data[0].value === item1.string_list_data[0].value)
                );
                setDoesNotFollowBack(unique);
                //Filtrar los elementos que son fan
                unique = list2.filter(item1 =>
                    !list1.relationships_following.some(item2 => item2.string_list_data[0].value === item1.string_list_data[0].value)
                );
                setIsFan(unique);
                //Filtrar elementos que siguen mutuamente
                unique = list1.relationships_following.filter(item1 =>
                    list2.some(item2 => item2.string_list_data[0].value === item1.string_list_data[0].value)
                );
                setIsFollowing(unique);
            } catch (error) {
                console.error("Error al leer los archivos JSON:", error);
            }
        };

        fetchData();
    });
    const drawList = (list, title) => {
        return (
            <>
                <h2>{title}</h2>
                <div className="list-container">
                    {list.map((item) =>
                    (
                        <a href={item.string_list_data[0].href} key={item.id} target='_blank'>
                            <span>{item.string_list_data[0].value + " "}</span>
                            <span>Seguido desde: </span>
                            <span>{(new Date(item.string_list_data[0].timestamp * 1000)).toLocaleString()}</span>
                        </a>
                    )
                    )}
                </div>
            </>
        )
    }

    return (
        <div>
            <h1>Informacion de seguimientos</h1>
            {drawList(doesNotFollowBack, "No te siguen de vuelta")}
            {drawList(isFan, "Admiradores")}
            {drawList(isFollowing, "Se siguen mutuamente")}
        </div>
    )
}

export default FollowersInfo