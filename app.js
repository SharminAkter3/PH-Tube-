const allCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/videos/categories`)
        .then((res) => res.json())
        .then((data) => displayData(data.data));
};

const displayData = (data) => {
    console.log(data);
    const totalCategory = document.getElementById('total-category');
    data.forEach(category => {
        const newLi = document.createElement('li');
        newLi.innerHTML = `
        <button class="category-button ${category.category == 'All' ? ' bg-danger text-white' : 'bg-body-secondary' } border-3 rounded-3" onclick="handleCategory('${category.category_id}')">
        ${category.category}  
    </button>

        `;
        newLi.setAttribute("class",`${category.category == 'All' ? ' bg-danger text-white' : 'bg-body-secondary' } border-3 rounded-3 py-2 px-3`);
        totalCategory.appendChild(newLi);
    });
};


const handleCategory = (categoryId) => {

    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayAllData(data.data));

  };

  handleCategory(1000)
  const displayAllData = (cardData) =>{
    console.log(cardData);
    const allCategory = document.getElementById('card-container');
        allCategory.innerHTML = " "

      if(!cardData.length){
        allCategory.innerHTML = `
        <img style="width: 200px;height: 180px;margin:auto"  src="./images/Icon.png" alt="">
        <h1 class="text-center">Oops!!! Sorry, There is no</h1> <br>
        <h1 class="text-center"> content here.</h1>
        `
      }
      // sort button 
       const sortButton = document.getElementById('sortByView');
       sortButton.onclick = () => {
         cardData.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
         displayAllData(cardData);
       };

    cardData.forEach(info => {
        const card = document.createElement('div')
       
        card.innerHTML = `
        <div class="card " style="width: 100%;">
        
       <div class="position-relative"> <img style="height: 200px; width: 100%;" src=${info.thumbnail} class="card-img-top " alt="..."></img>
       <p class="text-end rounded-3" style="position: absolute; bottom: 0; right: 0; color: #FFFFFF;background-color: #171717; padding: 5px;">${info.others?.posted_date && calculatedTime(info.others?.posted_date)}</p>
       </div>
        <div class="card-body d-flex">
          <div><img style="width: 50px;height: 50px;border-radius: 25px; " src=${info.authors[0].profile_picture} class="card-img-top" alt="..."></img></div>
          <div class="ms-3">
          <h5 class="card-title">${info.title}</h5>
          <P>${info.authors[0].profile_name}   ${info.authors[0].verified && '<i style="width: 20px; height:20px; border-radius: 15px;" class="fa fa-check text-center bg-primary text-white" style="font-size:60px;color:rgb(55, 0, 255);"></i>'} </P>
          <p>${info.others.views}</p>
          </div>
        </div>
      </div>
        `

        card.setAttribute("class",'col-lg-3 col-sm-12 col-md-6 my-3')
        allCategory.appendChild(card)
    })

  }

  const calculatedTime = (t)=>{
    
    t = parseInt(t)
    const hrs = Math.floor(t / 3600);
    const min = Math.floor(t % 3600 / 60);
    const h = hrs > 0 ? hrs + " hrs " : "";
    const m = min > 0 ? min + ' min ago ' : "";
    return h + m; 
   
  }
  

allCategory();
