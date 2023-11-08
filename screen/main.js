import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Swiper from "react-native-swiper";
import Avatar from "../assets/icons/avatar.png";
import { API_URL } from '../config/constants';
import axios from 'axios';
import React from 'react';
import dayjs from 'dayjs';
import {  GestureHandlerRootView } from 'react-native-gesture-handler';
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";



dayjs.extend(relativeTime);
dayjs.locale("ko");
export default function MainScreen(props) {
  const urlText = "https://a162-221-150-120-183.ngrok-free.app"; 
  const SCREEN_HEIGHT=Dimensions.get("window").height;
 
 const [products,setProducts] = React.useState([]);
 const [banners,setBanners] = React.useState([]);
 React.useEffect(()=>{ 
  axios.get(`${API_URL}/products`)
  .then((result)=>{
   setProducts(result.data.products);
   console.log(result); 
  }).catch((error)=>{ 
    console.error(error);
  });

  axios.get(`${API_URL}/banners`)
  .then((result)=>{
    /*const sBanner = result.data.banners;
   const bannerValue = sBanner.map(obj => {
      return  {...obj, imageUrl: `https://8175-221-150-120-183.ngrok-free.app/${obj.imageUrl}`}
    });
    */
    setBanners(result.data.banners); 
    
    console.log("banner::",banners);
  }).catch((error)=>{
    console.error(error);  
  }); 
 },[]);


 
     
  
 {banners.map((item, i)=>{
 console.log("item:::",item);
 console.log("item id:::",item.id);
 console.log("item url:::",item.imageUrl); 
         })}
  return (
    <View style={styles.container}>
     <ScrollView>
     
       
     <Swiper style={styles.wrapper} showsButtons={true}  autoplay >
      {banners.map((item, index) => (
        <TouchableOpacity style={styles.slide} key={item.id}  >
          <Image source={{ uri: `https://a162-221-150-120-183.ngrok-free.app/${item.imageUrl}` }} style={styles.bannerImage} />
        </TouchableOpacity>
      ))}
    </Swiper>

     
         
           
         
       
      
        <Text style={styles.headline}>판매되는 상품들</Text>
        <View style={styles.productList}>
        {
          products.map((product,index)=>{
            const urlText = "https://a162-221-150-120-183.ngrok-free.app"; 
            
            return (
           
              <TouchableOpacity onPress={()=>{
              props.navigation.navigate("Product",{
                id:product.id
              })
            
             }}>
             <View style={styles.productCard} key={product.id} >
              {product.soldout === 1 && <View style={styles.productBlur}/>}
              <View>
                <Image 
                style={styles.productImage}
                 source={{ 
                  uri: `${urlText}/${product.imageUrl}` 
                }} 
                resizeMode={'contain'}
                />
              </View>
             
              <View style={styles.productContents}>
              <Text style={styles.productName}>{product.name}</Text>  
              <Text style={styles.productPrice}>{product.price}</Text>  
              
              <View style={styles.productFooter}>        
              <View style={styles.productSeller}>
                <Image style={styles.productAvatar} source={Avatar}/>
                <Text style={styles.productSellerName}>{product.seller}</Text>
              </View>
              <Text style={styles.productDate}>{dayjs(product.createdAt).fromNow()}</Text>
              </View>
    
              </View>
    
            </View> 
            </TouchableOpacity>
            
            );
          })
        }
      
      </View> 
     
      </ScrollView>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:32
  },
  productCard:{
    width:320,
    borderColor:'rgb(230,230,230)',
    borderWidth:1,
    borderRadius:16,
    backgroundColor:"white",
    marginBottom: 8,
  },
  productImage:{
    width:'100%',
    height:210,
  },
  productContents:{
    padding:8,
  },
  productSeller:{
    flexDirection:'row',
  },
  productAvatar:{
    width:24,
    height:24,
  },
  productFooter:{
    flexDirection:'row',
    justifyContent:"space-between",
    marginTop:12,
    alignItems:"center",
  },
  productName :{
    fontSize: 18,
  },
  productPrice:{
    fontSize:18,
    fontWeight:'600',
    marginTop:8,
  },
  productSellerName :{
    fontSize:14,
  },
  productDate:{
    fontSize:16,
  },
  productList:{
    alignItems:"center",
  },
  headline :{
    fontSize:24,
    fontWeight:"600",
    marginBottom:24,
  },
  productBlur:{
    position: "absolute",
    top:0,
    bottom:0,
    right:0,
    left:0,
    backgroundColor:"#ffffffaa",
    zIndex:999,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    
  },
  slide:{
    height:200,
    justifyContent:"center",
    alignItems:'center',
  },
  wrapper:{
   
    height:200
  }
});
