import { Company } from "../Models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description } = req.body;
    if (!companyName || !description) {
      return res.status(400).json({
        message:"company name is requires",
        success: false,
      });
    }  

    const existingcompany = await Company.findOne({companyName});
    if (existingcompany) {
      return res.status(400).json({
        message: "comapany alrready exits",
        success: false,
      });
    }

   const company = await Company.create({
      companyName,
      userId: req.id, 
      description
    });
    return res.status(200).json({
      message: "company create success full",
      company,
      success: true,
    });
  } catch (error){
    console.error(error);
  }
};

// get company This function is used to fetch a company by its id.
// sari company return ho rhi hai 

export const getAllCompany = async (req, res) => {
  try {
    const userId  = req.id; // login user id 
    const companies = await Company.find({userId});
    if (!companies) {
      return res.status(404).json({
        message: "comapany not found",
        success: false,
      });
    }
     res.status(200).json({
      companies,
      message: "your company which you register",
      success: true,
    });
  
  } catch (error) {
    console.error(error);
  }
};




// get company by id 
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // login user id 

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "comapany not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      message: "your company which you register",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};


// update company

export const updateCompany = async (req, res) => {
  try {
    const companyId  = req.params.id;
    const { companyName, description, website, location } = req.body;
    const file = req.file;
    //cloudinary

    let company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    if ( companyName) {
      company. companyName =  companyName;
    }
    if (description) {
      company.description = description;
    }
    if (website) {
      company.website = website;
    }
    if (location) {
      company.location = location;
    }

    await company.save();
    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
