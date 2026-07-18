const url = 'https://raw.githubusercontent.com/dianaceciliallc/wdd231/main/chamber/data/members.json';
const cards = document.querySelector('.cards--wrap');
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

gridBtn.addEventListener("click", () => {
    gridBtn.classList.add('active');
    cards.classList.add("grid");
    cards.classList.remove("list");
    listBtn.classList.remove('active');
});

listBtn.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

const displayMembers = (members) => {
    members.forEach((member, i) => {
        let card = document.createElement('div');
        card.className = 'company--card';

        let name = document.createElement('h2');
        let description = document.createElement('p');
        let web = document.createElement('a');

        let wrapper = document.createElement('div');
        let list = document.createElement('ul');
        let address = document.createElement('li');
        let phone = document.createElement('li');
        let webList = document.createElement('li');

        let portrait = document.createElement('img');
        
        name.textContent = member.company_name;
    
        web.textContent = member.website;
        web.setAttribute('href', member.website); 
        web.setAttribute('target', '_blank');
        
        description.textContent = `${member.description}`;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        
        portrait.setAttribute('src', member.url);
        portrait.setAttribute('alt', `Logo of ${member.company_name}`);
        if (i < 2) {
            portrait.setAttribute('fetchpriority', 'high');
        } else {
            portrait.setAttribute('loading', 'lazy');
        }
        portrait.setAttribute('width', '120');
        portrait.setAttribute('height', '120');

        wrapper.classList.add('company-info--wrapper');
        wrapper.appendChild(portrait);

        webList.appendChild(web);
        list.appendChild(address);
        list.appendChild(phone);
        list.appendChild(webList);
        wrapper.appendChild(list);
        
        card.appendChild(name);
        card.appendChild(description);
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