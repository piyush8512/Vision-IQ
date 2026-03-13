import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type TabType = "upcoming" | "past";

interface Appointment {
id:number;
title:string;
doctor:string;
date:string;
time:string;
location:string;
address?:string;
type:"clinic" | "video";
status?:"completed";
}

export default function AppointmentsScreen(){

const [activeTab,setActiveTab] = useState<TabType>("upcoming");

const [appointments,setAppointments] = useState<Appointment[]>([
{
id:1,
title:"Annual Eye Exam",
doctor:"Dr. Sarah Johnson",
date:"Dec 28, 2025",
time:"2:00 PM",
location:"Vision Care Center",
address:"123 Health St, Suite 200",
type:"clinic"
},
{
id:2,
title:"Follow-up Consultation",
doctor:"Dr. Michael Chen",
date:"Jan 5, 2026",
time:"10:30 AM",
location:"Virtual Visit",
type:"video"
}
]);

const [pastAppointments] = useState<Appointment[]>([
{
id:3,
title:"Routine Checkup",
doctor:"Dr. Emily Davis",
date:"Nov 15, 2025",
time:"3:00 PM",
location:"Clinic",
type:"clinic",
status:"completed"
},
{
id:4,
title:"Contact Lens Fitting",
doctor:"Dr. Sarah Johnson",
date:"Oct 20, 2025",
time:"11:00 AM",
location:"Clinic",
type:"clinic",
status:"completed"
}
]);

const [modalVisible,setModalVisible] = useState(false);
const [newTitle,setNewTitle] = useState("");

/* ---------- ADD APPOINTMENT ---------- */

const addAppointment = () => {

if(!newTitle) return;

const newAppointment:Appointment={
id:Date.now(),
title:newTitle,
doctor:"Dr. Sarah Johnson",
date:"Jan 10, 2026",
time:"1:00 PM",
location:"Vision Care Center",
type:"clinic"
};

setAppointments(prev=>[...prev,newAppointment]);
setNewTitle("");
setModalVisible(false);

};

/* ---------- RESCHEDULE ---------- */

const rescheduleAppointment = (id:number)=>{

setAppointments(prev =>
prev.map(a =>
a.id===id
? {...a,date:"Jan 12, 2026",time:"4:00 PM"}
:a
)
);

};

/* ---------- DELETE ---------- */

const cancelAppointment = (id:number)=>{
setAppointments(prev => prev.filter(a => a.id!==id));
};

/* ---------- UI ---------- */

return(

<View style={styles.container}>

{/* HEADER */}

<Text style={styles.header}>Appointments</Text>

{/* TABS */}

<View style={styles.tabs}>

<TouchableOpacity
style={[styles.tab,activeTab==="upcoming" && styles.activeTab]}
onPress={()=>setActiveTab("upcoming")}
>
<Text style={activeTab==="upcoming"?styles.activeText:styles.tabText}>
Upcoming
</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.tab,activeTab==="past" && styles.activeTab]}
onPress={()=>setActiveTab("past")}
>
<Text style={activeTab==="past"?styles.activeText:styles.tabText}>
Past
</Text>
</TouchableOpacity>

</View>

<ScrollView showsVerticalScrollIndicator={false}>

{/* ---------- UPCOMING ---------- */}

{activeTab==="upcoming" && (

appointments.map(appt=>(

<View key={appt.id} style={styles.card}>

<View style={styles.cardHeader}>

<View>

<Text style={styles.title}>{appt.title}</Text>
<Text style={styles.doctor}>{appt.doctor}</Text>

</View>

<View style={styles.iconBox}>

{appt.type==="video" ? (
<MaterialCommunityIcons name="video-outline" size={22} color="#2563eb"/>
) : (
<Ionicons name="document-text-outline" size={20} color="#ff6600"/>
)}

</View>

</View>

<View style={styles.row}>
<Ionicons name="calendar-outline" size={16}/>
<Text style={styles.meta}>{appt.date}</Text>
</View>

<View style={styles.row}>
<Ionicons name="time-outline" size={16}/>
<Text style={styles.meta}>{appt.time}</Text>
</View>

<View style={styles.row}>
<Ionicons name="location-outline" size={16}/>
<Text style={styles.meta}>{appt.location}</Text>
</View>

{appt.address && (
<Text style={styles.address}>{appt.address}</Text>
)}

<View style={styles.buttonRow}>

<TouchableOpacity
style={styles.secondaryBtn}
onPress={()=>rescheduleAppointment(appt.id)}
>
<Text style={styles.secondaryText}>Reschedule</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.primaryBtn}
onPress={()=>cancelAppointment(appt.id)}
>
<Text style={styles.primaryText}>View Details</Text>
</TouchableOpacity>

</View>

</View>

))

)}

{/* ---------- PAST ---------- */}

{activeTab==="past" && (

pastAppointments.map(appt=>(

<View key={appt.id} style={styles.card}>

<View style={styles.cardHeader}>

<View>

<Text style={styles.title}>{appt.title}</Text>
<Text style={styles.doctor}>{appt.doctor}</Text>

</View>

<View style={styles.completed}>
<Text style={styles.completedText}>Completed</Text>
</View>

</View>

<View style={styles.row}>
<Ionicons name="calendar-outline" size={16}/>
<Text style={styles.meta}>{appt.date}</Text>
</View>

<View style={styles.row}>
<Ionicons name="time-outline" size={16}/>
<Text style={styles.meta}>{appt.time}</Text>
</View>

<TouchableOpacity style={styles.summaryBtn}>
<Text style={styles.summaryText}>View Summary</Text>
<Ionicons name="chevron-forward"/>
</TouchableOpacity>

</View>

))

)}

</ScrollView>

{/* ---------- ADD BUTTON ---------- */}

<TouchableOpacity
style={styles.fab}
onPress={()=>setModalVisible(true)}
>
<Ionicons name="add" size={28} color="white"/>
</TouchableOpacity>

{/* ---------- ADD MODAL ---------- */}

<Modal visible={modalVisible} animationType="slide" transparent>

<View style={styles.modalContainer}>

<View style={styles.modalCard}>

<Text style={styles.modalTitle}>New Appointment</Text>

<TextInput
placeholder="Appointment title"
style={styles.input}
value={newTitle}
onChangeText={setNewTitle}
/>

<TouchableOpacity style={styles.primaryBtn} onPress={addAppointment}>
<Text style={styles.primaryText}>Add Appointment</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.secondaryBtn}
onPress={()=>setModalVisible(false)}
>
<Text>Cancel</Text>
</TouchableOpacity>

</View>

</View>

</Modal>

</View>

);
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

container:{flex:1,padding:16,backgroundColor:"#f5f5f5"},

header:{fontSize:20,fontWeight:"600",marginBottom:15},

tabs:{flexDirection:"row",marginBottom:15},

tab:{
flex:1,
padding:10,
backgroundColor:"#eee",
borderRadius:10,
alignItems:"center",
marginRight:5
},

activeTab:{backgroundColor:"#ff6600"},

tabText:{color:"#666"},

activeText:{color:"white",fontWeight:"600"},

card:{
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:12
},

cardHeader:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:8
},

title:{fontWeight:"600",fontSize:16},

doctor:{color:"#777",fontSize:12},

row:{
flexDirection:"row",
gap:6,
alignItems:"center",
marginTop:4
},

meta:{color:"#555"},

address:{color:"#999",fontSize:11},

iconBox:{
backgroundColor:"#f0f0f0",
padding:8,
borderRadius:8
},

buttonRow:{
flexDirection:"row",
marginTop:10,
gap:10
},

secondaryBtn:{
flex:1,
borderWidth:1,
borderColor:"#ddd",
padding:8,
borderRadius:8,
alignItems:"center"
},

secondaryText:{color:"#444"},

primaryBtn:{
flex:1,
backgroundColor:"#ff6600",
padding:8,
borderRadius:8,
alignItems:"center"
},

primaryText:{color:"white"},

completed:{
backgroundColor:"#d4edda",
paddingHorizontal:8,
paddingVertical:3,
borderRadius:6
},

completedText:{fontSize:11,color:"#1a7f37"},

summaryBtn:{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
marginTop:10,
borderWidth:1,
borderColor:"#ddd",
padding:8,
borderRadius:10
},

summaryText:{marginRight:5},

fab:{
position:"absolute",
bottom:30,
right:20,
backgroundColor:"#ff6600",
width:56,
height:56,
borderRadius:28,
alignItems:"center",
justifyContent:"center",
elevation:5
},

modalContainer:{
flex:1,
backgroundColor:"rgba(0,0,0,0.4)",
justifyContent:"center",
alignItems:"center"
},

modalCard:{
backgroundColor:"white",
padding:20,
borderRadius:12,
width:"85%"
},

modalTitle:{fontSize:18,fontWeight:"600",marginBottom:10},

input:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:8,
padding:10,
marginBottom:10
}

});