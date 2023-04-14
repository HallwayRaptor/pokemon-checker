const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
	event.preventDefault(); // Prevent the form from submitting
	const input = document.querySelector("#pokemon-name");
  const name = input.value.trim().toLowerCase();
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const types = data.types
			.map((type) => {
				const typeName = type.type.name;
				const typeIconUrl = `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/type-logos/gen8/${typeName}.png`;
				return `<img src="${typeIconUrl}" alt="${typeName}" class="type-icon">`;
			}).join(' ')
    const spriteUrl = `https://play.pokemonshowdown.com/sprites/xyani/${data.name}.gif`;
		const info = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${spriteUrl}">
            <p>Types: ${types}</p>
          `;
		const pokemonInfo = document.querySelector("#pokemon-info");
		pokemonInfo.innerHTML = info;
	} catch (error) {
		console.error(error);
		const pokemonInfo = document.querySelector("#pokemon-info");
		pokemonInfo.innerHTML = `<p>Pokemon not found</p>`;
	}
});
