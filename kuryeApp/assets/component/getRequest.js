import axios from 'axios';

const getRequest = async (url) => {

    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.error(error);
        return null;
    };
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.text}>Response Data: {responseData ? responseData.results[0].name.first : "Loading..."}</Text>
    //   </View>
    // );
};




export default getRequest;

