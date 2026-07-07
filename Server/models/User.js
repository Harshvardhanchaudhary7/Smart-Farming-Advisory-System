import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
       name: {type:String,
           required : true},

       email: {type:String,
           required : true,
           unique:true},
       password:{type:String,
             required:true},
       phone:{
        type:String,
        default:"",},

       location:{
        type:String,
        default:"", },
       farmName:{
        type:String,
        default:"", },

       landSize:{
        type:String,
        default:"", },

       soilType:{
        type:String,
        default:"", },

        crops:{
           type:String,
          default:"", },
      
     totalLand:{
        type:String,
        default:"",},

      activeCrops:{
         type:String,
        default:"", },

       yieldRate:{
         type:String,
         default:"",},

       profileImage:{
        type:String,
        default:"",},

       bannerImage:{
        type:String,
        default:"",},
       farmerId: {
            type: String,
          default: "",},

        rainAlert: {
          type: Boolean,
             default: true,},

        heatAlert: {
          type: Boolean,
           default: true,},
    
        cropAlert: {
          type: Boolean,
          default: true,},
        lastNotificationType: {
          type: String,
           default: "",},

        lastNotificationTime: {
           type: Date,},
        language: {
          type: String,
           default: "en",},
},
{timestamps:true}
);


const User = mongoose.model("User",userSchema);
export default User;