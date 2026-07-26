import { supabase } from "../../../lib/supabaseClient";



/* ================= UNIVERSITIES COUNT ================= */


export async function getUniversitiesCount() {


  const { count, error } = await supabase
    .from("universities")
    .select("*", {
      count: "exact",
      head: true,
    });



  if (error) throw error;



  return count || 0;

}






/* ================= FACULTIES COUNT ================= */


export async function getFacultiesCount() {


  const { count, error } = await supabase
    .from("faculties")
    .select("*", {
      count: "exact",
      head: true,
    });



  if (error) throw error;



  return count || 0;

}







/* ================= FILES COUNT ================= */


/*
 الملفات التعليمية =
 exams + resources
*/


export async function getFilesCount() {



  const exams = await supabase
    .from("exams")
    .select("*", {
      count: "exact",
      head: true,
    });



  if (exams.error)
    throw exams.error;





  const resources = await supabase
    .from("resources")
    .select("*", {
      count: "exact",
      head: true,
    });





  if (resources.error)
    throw resources.error;





  return (
    (exams.count || 0) +
    (resources.count || 0)
  );

}









/* ================= LATEST UNIVERSITIES ================= */


export async function getLatestUniversities() {



  const { data, error } = await supabase
    .from("universities")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    )
    .limit(3);





  if (error)
    throw error;





  return data || [];

}









/* ================= LATEST FILES ================= */



export async function getLatestFiles() {



  const exams = await supabase
    .from("exams")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    )
    .limit(3);





  if (exams.error)
    throw exams.error;







  const resources = await supabase
    .from("resources")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    )
    .limit(3);






  if (resources.error)
    throw resources.error;







  const latestFiles = [



    ...(exams.data || []).map(
      (item)=>({

        ...item,

        type:"Exam"

      })
    ),




    ...(resources.data || []).map(
      (item)=>({

        ...item,

        type:"Resource"

      })
    )



  ];






  return latestFiles
    .sort(
      (a,b)=>
      new Date(b.created_at).getTime()
      -
      new Date(a.created_at).getTime()
    )
    .slice(0,5);



}