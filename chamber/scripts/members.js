const url = 'https://raw.githubusercontent.com/dianaceciliallc/wdd231/main/chamber/scripts/members.json';
const cards = document.querySelector('.cards--wrap');
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

gridBtn.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

const displayMembers = (members) => {
    members.forEach(member => {
        console.log(member)
        let card = document.createElement('div');
        card.className = 'company--card';

        let name = document.createElement('h2');
        let web = document.createElement('a');
        let wrapper = document.createElement('div');
        let list = document.createElement('ul');
        let address = document.createElement('li');
        let phone = document.createElement('li');
        let portrait = document.createElement('img');
        
        name.textContent = member.company_name;
        
        web.textContent = member.website;
        web.setAttribute('href', member.website); 
        web.setAttribute('target', '_blank');
        
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        
        portrait.setAttribute('src', member.img);
        portrait.setAttribute('alt', `Logo of ${member.company_name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '200');

        wrapper.classList.add('company-info--wrapper');
        wrapper.appendChild(portrait);
        
        list.appendChild(address);
        list.appendChild(phone);
        wrapper.appendChild(list);
        
        card.appendChild(name);
        card.appendChild(web);
        card.appendChild(wrapper);

        cards.appendChild(card);
    });
}

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.companies);
}

getMembersData();