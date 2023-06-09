import axios from "axios";

async function postRequestAdd(url, userid, productid, pharmacyId) {
  try {
    const postData = {
      userid: userid,
      productid: productid,
      pharmacyid: pharmacyId
    };
    const response = await axios.post(url, postData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function postRequestDelete(url, userid, productid) {
  try {
    const postData = {
      userid: userid,
      productid: productid,
    };
    const response = await axios.post(url, postData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { postRequestAdd as postRequest };
