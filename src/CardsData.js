export let cardData;
export function resetCard() {
    cardData = [];
}
// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    coverImage{
        large
    }
    title {
      english
    }
  }
}
`;

export async function fetchAnime(num) {
    for (let i = 0; i < num;) {
        let variables = {
            id: Math.floor(Math.random() * 1500 + 1)
        };
        let url = 'https://graphql.anilist.co',
            options = {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: variables
                }),
            };
        let anime = await fetch(url, options);
        if (anime.status === 404) {
            continue;
        }
        let animeData = await anime.json();
        if (animeData.data.Media?.title?.english) {
            let newCard = {
                name: animeData.data.Media.title.english,
                source: animeData.data.Media.coverImage.large,
                key: i,
            }
            cardData.push(newCard);
            i++;
        }

    }
    return cardData;
}


