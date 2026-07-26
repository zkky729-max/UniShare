import { supabase } from "../../../lib/supabaseClient";


// جلب الجامعات حسب الدولة

export async function getUniversitiesByCountry(countryId:string){

  const { data, error } = await supabase
    .from("universities")
    .select("*")
    .eq("country_id", countryId);


  if(error){
    throw error;
  }


  return data || [];

}



// جلب جامعة واحدة

export async function getUniversityById(id:string){

  const { data, error } = await supabase
    .from("universities")
    .select("*")
    .eq("id", id)
    .single();



  if(error){
    throw error;
  }


  return data;

}