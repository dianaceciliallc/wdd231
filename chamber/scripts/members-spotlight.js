const url = 'https://raw.githubusercontent.com/dianaceciliallc/wdd231/main/chamber/data/members.json';
const spotlightContainer = document.getElementById("spotlight-cards");

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    const qualifiedMembers = members.filter(
        member => member.membership_level === 2 || member.membership_level === 3
    );

    for (let i = qualifiedMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qualifiedMembers[i], qualifiedMembers[j]] = [qualifiedMembers[j], qualifiedMembers[i]];
    }

    const selectedMembers = qualifiedMembers.slice(0, 3);

    selectedMembers.forEach(member => {
        const isGold = member.membership_level === 3;
        const tierClass = isGold ? "gold-member" : "silver-member";
        const tierLabel = isGold ? "Gold Member" : "Silver Member";

        const card = document.createElement("article");
        card.className = `spotlight-card ${tierClass}`;

        card.innerHTML = `
            <span class="badge">${tierLabel}</span>
            <img src="${member.url}" alt="${member.company_name} Logo" loading="lazy" width="120" height="120">
            <h3>${member.company_name}</h3>
            <div class="contact-info">
                <p>📍 ${member.address}</p>
                <p>📞 ${member.phone}</p>
            </div>
            <a href="${member.website}" class="website-link" target="_blank" rel="noopener noreferrer">Visit Website →</a>
        `;

        spotlightContainer.appendChild(card);
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.companies);
        } else {
            throw Error("Failed to fetch member dataset");
        }
    } catch (error) {
        console.error(error);
    }
}

fetchSpotlights();