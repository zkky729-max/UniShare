import { supabase } from "../../../lib/supabaseClient";

import type { Post } from "../types/post";

import type {
  FeedFilter,
} from "../types/feed";






export async function getPosts(
  filter:FeedFilter = "all"
):Promise<Post[]> {



const {
 data:{
  user
 }
}=await supabase.auth.getUser();






let currentProfile:{
 faculty_id:string|null;
 specialty_id:string|null;
}|null=null;





if(user){


const {
 data:profile
}=await supabase

.from("profiles")

.select(
"faculty_id,specialty_id"
)

.eq(
"user_id",
user.id
)

.single();



currentProfile =
profile ?? null;


}









const {
data:rawPosts,
error
}=await supabase

.from("posts")

.select("*")

.order(
"created_at",
{
ascending:false
}
);



if(error)
throw error;



if(!rawPosts?.length)
return [];








let posts = rawPosts;








if(filter==="faculty"){


posts =
rawPosts.filter(post=>


post.audience_type==="public"

||

(
post.audience_type==="faculty"

&&

post.faculty_id ===
currentProfile?.faculty_id

)


);


}








if(filter==="specialty"){


posts =
rawPosts.filter(post=>


post.audience_type==="public"

||

(
post.audience_type==="faculty"

&&

post.faculty_id ===
currentProfile?.faculty_id

)


||

(
post.audience_type==="specialty"

&&

post.specialty_id ===
currentProfile?.specialty_id

)


);


}









const userIds=[
...new Set(
posts.map(
post=>post.user_id
)
)
];



const postIds =
posts.map(
post=>post.id
);








const {
data:profiles
}=await supabase

.from("profiles")

.select(
"user_id,full_name,username,avatar_url"
)

.in(
"user_id",
userIds
);








const {
data:likes
}=await supabase

.from("likes")

.select(
"post_id,user_id"
)

.in(
"post_id",
postIds
);








const {
data:comments
}=await supabase

.from("comments")

.select(
"post_id"
)

.in(
"post_id",
postIds
);








const profilesMap =
new Map(

(profiles??[])

.map(
profile=>[
profile.user_id,
profile
]
)

);








const likesCount =
new Map<string,number>();


(likes??[]).forEach(like=>{


likesCount.set(

like.post_id,

(
likesCount.get(
like.post_id
) ?? 0
)

+1

);


});








const commentsCount =
new Map<string,number>();


(comments??[]).forEach(comment=>{


commentsCount.set(

comment.post_id,

(
commentsCount.get(
comment.post_id
) ?? 0
)

+1

);


});









return posts.map(post=>{


const profile =
profilesMap.get(
post.user_id
);




return {


id:post.id,


author:{

id:post.user_id,

name:
profile?.full_name ??
profile?.username ??
"مستخدم",


avatar:
profile?.avatar_url ??
undefined,

},


content:
post.content,


image:
post.image_url ??
undefined,


images_urls:
post.images_urls ?? [],


pdf:
post.pdf_url ??
undefined,



audienceType:
post.audience_type ??
"public",


facultyId:
post.faculty_id ??
undefined,


specialtyId:
post.specialty_id ??
undefined,


levelId:
post.level_id ??
undefined,


moduleId:
post.module_id ??
undefined,



likes:
likesCount.get(
post.id
) ?? 0,


likedByMe:

user

?

(likes??[]).some(
like=>

like.post_id===post.id
&&
like.user_id===user.id

)

:

false,



comments:
commentsCount.get(
post.id
) ?? 0,



shares:0,



isOwner:
user?.id === post.user_id,



createdAt:
new Date(
post.created_at
)
.toLocaleString(
"ar-DZ"
),


};


});


}