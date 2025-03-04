import UserData from "../Model/userModel";

export const getData = async (req:any, res:any) => {
  try {
    const { usage, userGoal, rateUserValue, suggestion, birthday , Name } = req.body;
    if (!usage || !userGoal || !rateUserValue || !birthday ||!Name) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const userLimit = await UserData.find({Name:Name}).countDocuments()
    if(userLimit>=5){
        return res.status(200).json({ limit:true, message: "User Limit reached" });
    }
    const rate = parseInt(rateUserValue, 10);
    const formattedBirthday = new Date(birthday).toISOString().split("T")[0]; 
    const newData = await UserData.insertOne({
      usage,
      Name,
      userGoal,
      rateUserValue: rate,
      suggestion,
      birthday: formattedBirthday, 
    });
    res.json({ success: true, message: "Data saved successfully" , userdata:newData });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getReviews = async (req:any, res:any)=>{
    try {
        let data = await UserData.find({})
        res.status(200).json({success:true,userDatas:data})
    } catch (error) {
        console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}