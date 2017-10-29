import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MixoloEventService{

    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http=http;
        //this.baseUrl='https://www.milox.com/r/sports/top.json';
        this.baseUrl=atob("aHR0cDovL2FwcGRkaWN0aW9uc3R1ZGlvLmNvbS9taXhvbG8v");
    }

    getAllEvents(){
        return this.http.get(this.baseUrl+"?action=events").map(res=>res.json());
    }
   
    getEventById(event_id){
        var wu=this.baseUrl+"?action=event_details&Event_id="+event_id;
        return this.http.get(wu).map(res=>res.json()); 
    }

    attemptLogin(username,password){
        var wu=this.baseUrl+"?action=login&Username="+username+"&Password="+password;
        return this.http.get(wu).map(res=>res.json());
    }

    attemptAdminLogin(email,password){
        
        var wu=this.baseUrl+"attendize/public/api/Login";   
        let postParams={
            email:email,
            password:password
        } 
        return this.http.post(wu,postParams).map(res=>res.json());
    }

    getProfileInterests(user_id){
        var wu=this.baseUrl+"?action=user_interests&User_ID="+user_id;
        return this.http.post(wu).map(res=>res.json());
    }

    

    getAllInterests(){
        var wu=this.baseUrl+"?action=interests_list";
        return this.http.get(wu).map(res=>res.json());
    }

    updateProfileDetails(user_id,FirstName,Last_Name,Email,Location,Date_Birth,Max_Distance,Profile_Img,Interests,public_profile,push_notification,app_sounds_vibrations){
        
        var wu=this.baseUrl+"?action=update_profile&user_id="+user_id+"&FirstName="+FirstName+"&Last_Name="+Last_Name+"&Email="+Email+"&Location="+Location;
        if(Date_Birth)
         wu+="&Date_Birth="+Date_Birth;
        if(Max_Distance)
         wu+="&Max_Distance="+Max_Distance;
        if(Profile_Img)
         wu+="&Profile_Img="+Profile_Img;
        if(Interests){
            for(var i=0;i<Interests.length;i++){
                wu+="&Interests["+i+"]="+Interests[i];
            } 
        }
        if(public_profile){
          public_profile=(public_profile==true)?1:0;
          wu+="&public_profile="+public_profile;  
        }
        if(push_notification)
          wu+="&push_notification="+push_notification;
        if(app_sounds_vibrations)
          wu+="&app_sounds_vibrations="+app_sounds_vibrations;

        return this.http.get(wu).map(res=>res.json());
    }

    updateProfilePassword(user_id,password){
        var wu=this.baseUrl+"?action=change_password&User_id="+user_id+"&NewPassword="+password;
        return this.http.get(wu).map(res=>res.json());
    }

    updateUserInterests(user_id,interests){
        
        var wu=this.baseUrl+"?action=add_user_interests&User_ID="+user_id;
        for(var i=0;i<interests.length;i++){
            wu+="&Interests["+i+"]="+interests[i];
        } 
        return this.http.post(wu).map(res=>res.json());
    }
    
    appCheckoutSuccess(event_id,app_user_id,ticket_id,transaction_id,success_payment,order_total_amount,total_ticket_quantity,booking_fee,organiser_booking_fee,message){
        var wu=this.baseUrl+"attendize/public/app_checkout_success";

        let postParams={
            event_id:event_id,
            app_user_id:app_user_id,
            ticket_id:ticket_id,
            transaction_id:transaction_id,
            success_payment:success_payment,
            order_total_amount:order_total_amount,
            total_ticket_quantity:total_ticket_quantity,
            booking_fee:booking_fee,
            organiser_booking_fee:organiser_booking_fee,
            message:message
        } 
        
        return this.http.get(wu,postParams).map(res=>res.json());
    }

    sendEmailOTP(email_address){
        var wu=this.baseUrl+"?action=forget_pwd&Email="+email_address
        return this.http.get(wu).map(res=>res.json());
    }

    changePassword(email_address,otp,password){
        var wu=this.baseUrl+"?action=reset_pwd&Email="+email_address+"&OTP="+otp+"&NewPassword="+password;
        return this.http.get(wu).map(res=>res.json());
    }

    doRegistration(first_name,last_name,email_address,password,dob,udid){
        var wu=this.baseUrl+"?action=register&FirstName="+first_name+"&LastName="+last_name+"&Email="+email_address+"&Password="+password+"&UDID="+udid+"&Date_Birth="+dob;
        return this.http.get(wu).map(res=>res.json());
    }

    getUserList(){
        var wu=this.baseUrl+"?action=user_list";
        return this.http.get(wu).map(res=>res.json());
    }
    getUserListByChatOrder(){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=user_list_chat&UserID="+user_id;
        return this.http.get(wu).map(res=>res.json());
    }

    getChatMessages(chat_user,start,limit){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=chat&UserID="+user_id+"&ToUser="+chat_user+"&paging_start="+start+"&limit="+limit;
        return this.http.get(wu).map(res=>res.json());
    }

    addNewChatMessage(message,chat_user){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=add_chat&FromUser="+user_id+"&ToUser="+chat_user+"&Message="+message;
        return this.http.get(wu).map(res=>res.json());
    }

    getNewUnreadChatMessage(chat_user){ 
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=chat&UserID="+user_id+"&FromUser="+chat_user;
        return this.http.get(wu).map(res=>res.json());
    }

    blockSecondUser(chat_user){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=block_user&UserID="+user_id+"&Blocked_user_id="+chat_user;
        return this.http.get(wu).map(res=>res.json());
    }
    
    unBlockSecondUser(chat_user){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=unblock_user&UserID="+user_id+"&Blocked_user_id="+chat_user;
        return this.http.get(wu).map(res=>res.json()); 
    }
    reportSecondUser(chat_user,report_message){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=report_user&UserID="+user_id+"&Report_user_id="+chat_user+"&Details="+report_message;
        return this.http.get(wu).map(res=>res.json());
    }

    deleteSecondUserConversation(chat_user){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=delete_chat&UserID="+user_id+"&ToUser="+chat_user;
        return this.http.get(wu).map(res=>res.json());
    }


    //#####################################Events Webservice############################################

    getUpcomingEvents(latitude,longitude){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=user_events&user_id="+user_id+"&status=UPCOMING";

        if(latitude)
          wu+="&Lat="+latitude;
        if(longitude)
          wu+="&Log="+longitude;

        return this.http.get(wu).map(res=>res.json());
    }

    getPastEvents(latitude,longitude){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=user_events&user_id="+user_id+"&status=PAST";

        if(latitude)
          wu+="&Lat="+latitude;
        if(longitude)
          wu+="&Log="+longitude;

        return this.http.get(wu).map(res=>res.json());
    }

    submitEventRating(event_id,likely_recommend,how_friendly,attend_another,rate,comments){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=rate_event&user_id="+user_id+"&event_id="+event_id+"&likely_recommend="+likely_recommend+"&how_friendly="+how_friendly;
        wu+="&attend_another="+attend_another+"&rate="+rate+"&comments="+comments;
        return this.http.get(wu).map(res=>res.json());
    }

    deactiveAccount(){
        //We have to suspend the user, so that it can be activated later on.
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=suspend_user&user_id="+user_id;
        return this.http.get(wu).map(res=>res.json()); 

    }

    updateNotification(push_notification,app_sounds_vibrations){
        var user_id=localStorage.getItem('user_id');
        var pn=(push_notification==true)?1:0;
        var asv=(app_sounds_vibrations==true)?1:0;
        var wu=this.baseUrl+"?action=update_user_settings&user_id="+user_id+"&push_notification="+pn+"&app_sounds_vibrations="+asv;
        return this.http.get(wu).map(res=>res.json()); 
    }

    getProfileData(){
        var user_id=localStorage.getItem('user_id');
        var wu=this.baseUrl+"?action=user_profile&User_ID="+user_id;
        return this.http.get(wu).map(res=>res.json());
    }

    sendFeedbackMessage(feedback_message){

        var user_id=localStorage.getItem('user_id'); 
        var wu=this.baseUrl+"?action=feedback&UserID="+user_id+"&Message="+feedback_message;
        return this.http.get(wu).map(res=>res.json());

    }

    getMixoloData(){
        var wu=this.baseUrl+"?action=Mixolo_data";
        return this.http.get(wu).map(res=>res.json());
    }

    getMixoloFaq(){
        var wu=this.baseUrl+"?action=faq";
        return this.http.get(wu).map(res=>res.json());
    }

    getAllEventsOfUser(latitude,longitude){
        var user_id=localStorage.getItem('user_id'); 
        var wu=this.baseUrl+"?action=user_events&user_id="+user_id+"&Lat="+latitude+"&Lng="+longitude;
        return this.http.get(wu).map(res=>res.json()); 
    }


    getCityList(){
        var wu=this.baseUrl+"?action=city_list";
        return this.http.get(wu).map(res=>res.json());
    }

    createEvent(){
        
        var wu=this.baseUrl+"attendize/public/api/addEvent";
        var food_beverage_obj=[];
        if(localStorage.getItem('event_fd_1'))
           food_beverage_obj.push("Catered by someone else");
        if(localStorage.getItem('event_fd_2'))
           food_beverage_obj.push("Alcoholic Beverages available");
        if(localStorage.getItem('event_fd_3'))
           food_beverage_obj.push("Family Friendly");
        if(localStorage.getItem('event_fd_4'))
           food_beverage_obj.push("Pet Friendly");
        if(localStorage.getItem('event_fd_5'))
           food_beverage_obj.push("Transportation Offered");
        
        let postParams={
                user_id:localStorage.getItem('user_id'),
                event_title:localStorage.getItem('admin_event_title'),
                Interest_type:localStorage.getItem('type'),
                tagline:localStorage.getItem('admin_event_tagline'),
                event_description:localStorage.getItem('event_description'),
                event_start_date:localStorage.getItem('event_start_date'),
                event_end_date:localStorage.getItem('event_end_date'),
                event_venue:localStorage.getItem('event_venue_description'),
                address:localStorage.getItem('event_venue_address'),
                state:localStorage.getItem('event_state'),
                city:localStorage.getItem('event_city'),
                other_city:localStorage.getItem('where'),
                zip:localStorage.getItem('event_zipcode'),
                food_offered:localStorage.getItem('event_food'),
                beverages:localStorage.getItem('event_beverages'),
                Food_Beverage:food_beverage_obj,
                other_offers:localStorage.getItem('event_other_offers'),
                additional_notes:localStorage.getItem('event_additional_notes'),
                organiser_id:localStorage.getItem('admin_user_id'),
                ticket_title:localStorage.getItem('event_ticket_title'),
                ticket_quantity:localStorage.getItem('event_ticket_price'),
                ticket_price:localStorage.getItem('event_ticket_quantity'),
                event_photo1:localStorage.getItem('event_image_one'),
                event_photo2:localStorage.getItem('event_image_two'),
                event_photo3:localStorage.getItem('event_image_three'),
                event_photo4:localStorage.getItem('event_image_four'),
                event_photo5:localStorage.getItem('event_image_five')
        }
        return this.http.post(wu,postParams).map(res=>res.json());

    }
 
    getStateList(){
        var wu=this.baseUrl+"?action=state_list";
        return this.http.get(wu).map(res=>res.json());
    }

    sendOrganizerFeedback(message,organiser_id){
        var wu=this.baseUrl+"?action=org_feedback&Message="+message+"&organiser_id="+organiser_id;
        return this.http.get(wu).map(res=>res.json());
    }
    
    searchEventsByFilter(Max_Distance,City,Price,Interests,Keyword,Lat,Log,Gps_filter,dated){
        var user_id=localStorage.getItem('user_id'); 
        var wu=this.baseUrl+"?action=events&user_id="+user_id;
        if(Lat)
           wu+="&Lat="+Lat;
        if(Log)
           wu+="&Lng="+Log;
        if(Max_Distance)
           wu+="&Max_Distance="+Max_Distance;
        if(City)
           wu+="&City="+City;
        if(Price)
          wu+="&Price="+Price;
        if(Interests[0]){
            for(var i=0;i<Interests.length;i++){
                wu+="&Interests["+i+"]="+Interests[i];
            } 
        }

        if(Keyword)
           wu+="&Keyword="+Keyword;
        if(Gps_filter)
           wu+="&Gps_filter="+Gps_filter;
        // if(dated)
        //    wu+="&Date="+dated; This is the road block
       
        return this.http.get(wu).map(res=>res.json());
    }

    searchEventsByKeywords(keyword){
        var user_id=localStorage.getItem('user_id'); 
        var wu=this.baseUrl+"?action=event_search&User_ID="+user_id+"&Search_key="+keyword;
        return this.http.get(wu).map(res=>res.json());
    }
    //##################################Events Webservice Ends Here####################################
    



} //Class Ends Here.