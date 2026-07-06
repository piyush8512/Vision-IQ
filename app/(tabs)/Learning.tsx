import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type TabType = "courses" | "articles" | "progress";

export default function Learning() {

const [activeTab,setActiveTab] = useState<TabType>("courses");
const [search,setSearch] = useState("");

/* ---------------- COURSES DATA ---------------- */

const courses = [
{
id:1,
title:"Understanding Your Vision",
lessons:8,
duration:"45 min",
progress:62,
icon:"eye-outline",
color:"#cfe2ff"
},
{
id:2,
title:"Nutrition for Healthy Eyes",
lessons:7,
duration:"50 min",
progress:28,
icon:"heart-outline",
color:"#d4edda"
}
];

const allCourses = [
{
title:"Understanding Your Vision",
lessons:"8 lessons",
duration:"45 min",
level:"Beginner",
icon:"eye-outline",
color:"#cfe2ff",
enrolled:true
},
{
title:"Common Eye Conditions",
lessons:"12 lessons",
duration:"1h 20min",
level:"Intermediate",
icon:"heart-outline",
color:"#ffd6d6"
},
{
title:"Digital Eye Strain Prevention",
lessons:"6 lessons",
duration:"35 min",
level:"Beginner",
icon:"cellphone",
color:"#e7d9ff",
enrolled:true
},
{
title:"Nutrition for Healthy Eyes",
lessons:"7 lessons",
duration:"50 min",
level:"Beginner",
icon:"heart-outline",
color:"#d4edda",
enrolled:true
},
{
title:"Reading Your Prescription",
lessons:"5 lessons",
duration:"25 min",
level:"Beginner",
icon:"file-document-outline",
color:"#ffe4c4"
}
];

/* ---------------- ARTICLES ---------------- */

const articles = [
{
title:"The 20-20-20 Rule for Eye Strain",
time:"3 min read",
icon:"eye-outline",
color:"#f3e8ff"
},
{
title:"Best Foods for Eye Health",
time:"5 min read",
icon:"food-apple",
color:"#e6f4ea"
},
{
title:"Blue Light and Your Sleep",
time:"4 min read",
icon:"weather-night",
color:"#fff3cd"
},
{
title:"Managing Screen Time Effectively",
time:"6 min read",
icon:"cellphone",
color:"#e0f2ff"
},
{
title:"Early Signs of Vision Problems",
time:"4 min read",
icon:"alert-outline",
color:"#ffe4e6"
},
{
title:"UV Protection for Your Eyes",
time:"3 min read",
icon:"sunglasses",
color:"#f5f5f5"
}
];

/* ---------------- UI ---------------- */

return(

<View style={styles.container}>

{/* HEADER */}

<View style={styles.header}>
<Ionicons name="arrow-back" size={22}/>
<Text style={styles.headerTitle}>Learning</Text>
</View>

{/* TABS */}

<View style={styles.tabs}>

<TouchableOpacity
style={[styles.tab,activeTab==="courses" && styles.activeTab]}
onPress={()=>setActiveTab("courses")}
>
<Text style={activeTab==="courses"?styles.activeText:styles.tabText}>
Courses
</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.tab,activeTab==="articles" && styles.activeTab]}
onPress={()=>setActiveTab("articles")}
>
<Text style={activeTab==="articles"?styles.activeText:styles.tabText}>
Articles
</Text>
</TouchableOpacity>

<TouchableOpacity
style={[styles.tab,activeTab==="progress" && styles.activeTab]}
onPress={()=>setActiveTab("progress")}
>
<Text style={activeTab==="progress"?styles.activeText:styles.tabText}>
My Progress
</Text>
</TouchableOpacity>

</View>

{/* SEARCH */}

<TextInput
placeholder={`Search ${activeTab}...`}
style={styles.search}
value={search}
onChangeText={setSearch}
/>

<ScrollView showsVerticalScrollIndicator={false}>

{/* ---------------- COURSES TAB ---------------- */}

{activeTab==="courses" && (

<View>

<Text style={styles.section}>Continue Learning</Text>

{courses.map(course => (

<View key={course.id} style={styles.card}>

<View style={styles.row}>

<View style={[styles.iconBox,{backgroundColor:course.color}]}>
<Ionicons name={course.icon as any} size={22} color="#1a73e8"/>
</View>

<View style={{flex:1}}>

<Text style={styles.courseTitle}>{course.title}</Text>

<Text style={styles.meta}>
{course.lessons} lessons • {course.duration}
</Text>

<View style={styles.progressBar}>
<View
style={[
styles.progressFill,
{width:`${course.progress}%`}
]}
/>
</View>

<View style={styles.progressRow}>
<Text style={styles.smallText}>
{Math.round(course.progress/100*course.lessons)} of {course.lessons} lessons
</Text>

<Text style={styles.smallText}>
{course.progress}%
</Text>
</View>

</View>

</View>

</View>

))}

<Text style={styles.section}>All Courses</Text>

{allCourses.map((course,i)=>(

<View key={i} style={styles.card}>

<View style={styles.row}>

<View style={[styles.iconBox,{backgroundColor:course.color}]}>
<MaterialCommunityIcons name={course.icon as any} size={22}/>
</View>

<View style={{flex:1}}>

<Text style={styles.courseTitle}>{course.title}</Text>

<Text style={styles.description}>
Learn how your eyes work and what makes vision possible
</Text>

<View style={styles.metaRow}>

<Text style={styles.meta}>{course.lessons}</Text>

<Text style={styles.meta}>{course.duration}</Text>

<View style={styles.level}>
<Text style={styles.levelText}>{course.level}</Text>
</View>

</View>

{course.enrolled && (
<Text style={styles.enrolled}>Enrolled</Text>
)}

</View>

</View>

</View>

))}

</View>

)}

{/* ---------------- ARTICLES TAB ---------------- */}

{activeTab==="articles" && (

<View>

<View style={styles.tipCard}>

<Text style={styles.tipTitle}>Daily Eye Care Tip</Text>

<Text style={styles.tipText}>
Keep your eyes hydrated by blinking regularly when using digital devices.
</Text>

<TouchableOpacity style={styles.learnBtn}>
<Text style={{color:"white"}}>Learn More</Text>
</TouchableOpacity>

</View>

<Text style={styles.section}>Quick Reads</Text>

{articles.map((a,i)=>(

<View key={i} style={styles.card}>

<View style={styles.row}>

<View style={[styles.articleIcon,{backgroundColor:a.color}]}>
<MaterialCommunityIcons name={a.icon as any} size={22} color="#444"/>
</View>

<View style={{flex:1}}>
<Text style={styles.articleTitle}>{a.title}</Text>
<Text style={styles.meta}>{a.time}</Text>
</View>

<Ionicons name="bookmark-outline" size={20} color="#999"/>

<Ionicons name="chevron-forward" size={20} color="#FF6A00"/>

</View>

</View>

))}

</View>

)}

{/* ---------------- PROGRESS TAB ---------------- */}

{activeTab==="progress" && (

<View>

<View style={styles.statsGrid}>

<View style={styles.statCard}>
<View style={[styles.statIcon,{backgroundColor:"#ffe4c4"}]}>
<MaterialCommunityIcons name="school-outline" size={22}/>
</View>
<Text style={styles.statNumber}>3</Text>
<Text style={styles.statLabel}>Courses Enrolled</Text>
</View>

<View style={styles.statCard}>
<View style={[styles.statIcon,{backgroundColor:"#d4edda"}]}>
<MaterialCommunityIcons name="check-circle-outline" size={22}/>
</View>
<Text style={styles.statNumber}>13</Text>
<Text style={styles.statLabel}>Lessons Completed</Text>
</View>

<View style={styles.statCard}>
<View style={[styles.statIcon,{backgroundColor:"#dbeafe"}]}>
<MaterialCommunityIcons name="clock-outline" size={22}/>
</View>
<Text style={styles.statNumber}>2.5h</Text>
<Text style={styles.statLabel}>Learning Time</Text>
</View>

<View style={styles.statCard}>
<View style={[styles.statIcon,{backgroundColor:"#ede9fe"}]}>
<MaterialCommunityIcons name="trending-up" size={22}/>
</View>
<Text style={styles.statNumber}>7</Text>
<Text style={styles.statLabel}>Day Streak</Text>
</View>

</View>

<Text style={styles.section}>Achievements</Text>

<View style={styles.achievementRow}>

<View style={styles.achievementCard}>
<Text style={styles.achievementIcon}>🎓</Text>
<Text style={styles.achievementTitle}>First Course</Text>
<Text style={styles.achievementDate}>Dec 1, 2025</Text>
</View>

<View style={styles.achievementCard}>
<Text style={styles.achievementIcon}>📚</Text>
<Text style={styles.achievementTitle}>Knowledge Seeker</Text>
<Text style={styles.achievementDate}>Dec 5, 2025</Text>
</View>

<View style={styles.achievementCard}>
<Text style={styles.achievementIcon}>👁</Text>
<Text style={styles.achievementTitle}>Vision Expert</Text>
</View>

<View style={styles.achievementCard}>
<Text style={styles.achievementIcon}>💯</Text>
<Text style={styles.achievementTitle}>Perfect Score</Text>
</View>

<View style={styles.achievementCard}>
<Text style={styles.achievementIcon}>🔥</Text>
<Text style={styles.achievementTitle}>Streak Champion</Text>
<Text style={styles.achievementDate}>Dec 10, 2025</Text>
</View>

</View>

<Text style={styles.section}>Recent Activity</Text>

<View style={styles.activityCard}>
<MaterialCommunityIcons name="check-circle" size={22} color="#16a34a"/>
<View style={{flex:1}}>
<Text>Completed "Digital Eye Strain Prevention"</Text>
<Text style={styles.meta}>2 days ago</Text>
</View>
</View>

<View style={styles.activityCard}>
<MaterialCommunityIcons name="play-circle" size={22} color="#2563eb"/>
<View style={{flex:1}}>
<Text>Started "Nutrition for Healthy Eyes"</Text>
<Text style={styles.meta}>3 days ago</Text>
</View>
</View>

<View style={styles.activityCard}>
<MaterialCommunityIcons name="trophy" size={22} color="#f97316"/>
<View style={{flex:1}}>
<Text>Earned "Streak Champion" badge</Text>
<Text style={styles.meta}>1 week ago</Text>
</View>
</View>

</View>

)}

</ScrollView>

</View>

);
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

container:{flex:1,padding:16,backgroundColor:"#f6f6f6"},

header:{flexDirection:"row",alignItems:"center",gap:10,marginBottom:15},

headerTitle:{fontSize:20,fontWeight:"600"},

tabs:{flexDirection:"row",marginBottom:15},

tab:{
flex:1,
padding:10,
backgroundColor:"#eee",
borderRadius:10,
alignItems:"center",
marginRight:5
},

activeTab:{backgroundColor:"#FF6A00"},

tabText:{color:"#555"},

activeText:{color:"white",fontWeight:"600"},

search:{
backgroundColor:"white",
padding:10,
borderRadius:10,
marginBottom:15
},

section:{fontSize:16,fontWeight:"600",marginBottom:10},

card:{
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:12
},

row:{flexDirection:"row",gap:12,alignItems:"center"},

iconBox:{
width:40,
height:40,
borderRadius:10,
alignItems:"center",
justifyContent:"center"
},

articleIcon:{
width:44,
height:44,
borderRadius:12,
alignItems:"center",
justifyContent:"center"
},

courseTitle:{fontWeight:"600",marginBottom:2},

articleTitle:{fontWeight:"600"},

description:{color:"#666",fontSize:12},

meta:{color:"#888",fontSize:12},

progressBar:{
height:6,
backgroundColor:"#eee",
borderRadius:10,
marginTop:8
},

progressFill:{
height:6,
backgroundColor:"#FF6A00",
borderRadius:10
},

progressRow:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:5
},

smallText:{fontSize:11,color:"#777"},

metaRow:{flexDirection:"row",gap:10,marginTop:6,alignItems:"center"},

level:{
backgroundColor:"#d4edda",
paddingHorizontal:8,
paddingVertical:3,
borderRadius:6
},

levelText:{fontSize:11},

enrolled:{color:"#FF6A00",marginTop:6,fontSize:12},

tipCard:{
backgroundColor:"#FF6A00",
padding:16,
borderRadius:12,
marginBottom:15
},

tipTitle:{color:"white",fontWeight:"600",marginBottom:5},

tipText:{color:"white",marginBottom:10},

learnBtn:{
backgroundColor:"rgba(255,255,255,0.2)",
padding:8,
borderRadius:8,
alignSelf:"flex-start"
},

statsGrid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between",
marginBottom:15
},

statCard:{
width:"48%",
backgroundColor:"white",
padding:15,
borderRadius:12,
marginBottom:12,
alignItems:"center"
},

statIcon:{
width:36,
height:36,
borderRadius:10,
alignItems:"center",
justifyContent:"center",
marginBottom:6
},

statNumber:{fontSize:20,fontWeight:"700"},

statLabel:{fontSize:12,color:"#666"},

achievementRow:{
flexDirection:"row",
flexWrap:"wrap",
gap:10,
marginBottom:15
},

achievementCard:{
backgroundColor:"white",
padding:12,
borderRadius:12,
width:110,
alignItems:"center"
},

achievementIcon:{fontSize:22},

achievementTitle:{fontSize:12,fontWeight:"600"},

achievementDate:{fontSize:10,color:"#888"},

activityCard:{
flexDirection:"row",
gap:10,
backgroundColor:"white",
padding:12,
borderRadius:12,
marginBottom:10,
alignItems:"center"
}

});