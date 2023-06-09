import medicineCategory from "../medicinesDB/medicineCategories";

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}



export async function discovermedicineCategories(items){
  let result = [];
  for(let i = 1; i < medicineCategory.length; i++){
    let medicinesP = items.filter(({ type }) => type.find((str) => str == medicineCategory[i].name));
    if(medicinesP.length >= 1) result.push(medicineCategory[i]); //eger bir katogoride 1 urun veya daha fazlasi var ise onu ekrana bas...
    // console.log(`${ medicineCategory[i].name }: ${ medicinesP.length }`);
  }
  return(result);
}


export async function medicineIngredient(medicineP = []){
  let ingredients = [];
  for(let i = 0; i < medicineP.length; i++) {
    let result = Ingredients.filter((ingredient) => ingredient.name == medicineP[i].image);
    if(result.length > 0){
      ingredients.push(result[0]);
    } else {
      ingredients.push(null);
    }
  }

  return(ingredients);
}