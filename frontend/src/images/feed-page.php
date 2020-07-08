<style>
	.headar {
    width: 99%!important;
    background-color: #2a2a2a;
    float: left;
    position: fixed;
    z-index: 99999;
}
.strw {
    padding: 20px!important;
    border-radius: 5px 5px 0px 0px;
    background: #25272c!important;
    word-break: normal;
}
	.feed-cont .tabcontent {
    display: none;
    padding: 6px 12px;
    border-top: none;
    margin-top: 0;
}
	.bottom-modal {
		z-index: 1;
		padding-top: 35px;
    background-color: #25272c;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 99%;
}
#guest_login_modal .logfo {
    width: 100%;
    background-color: #25272c;
    padding: 15px;
    margin-top: 0;
    border-radius: 8px;
    float: none;
    margin-bottom: 25px;
}
#guest_login_modal .col {
    float: none;
    width: 100%;
    margin: 0;
    padding: 0;
    /* margin-top: 20px; */
}

	.full .col-md-12 {
    width: 100%;
    background: #181818;
    padding: 0;
    float: left;
}
.bottom-modal .container{
	width: 1170px;
}
.guest-login .container{
	width: 1170px;
}
	/*.headar{
		display: none;
	}*/
	.topnav .container {
	    width: 1170px;
	}
	.topnav {
	      width: 100%;
    position: fixed;
    overflow: hidden;
    background-color: #2a2a2a;
    z-index: 999;
	}
	
	.topnav a {
	  float: left;
	  display: block;
	  color: black;
	  text-align: center;
	  padding: 14px 16px;
	  text-decoration: none;
	  font-size: 17px;
	}
	
	.topnav a:hover {
	  background-color: #ddd;
	  color: black;
	}
	
	.topnav a.active {
	  background-color: #2196F3;
	  color: white;
	}
	
	.topnav .login-container {
	  float: right;
	}
	
	.topnav input[type=text] {
	  height: 30px;
	    background: #181818;
	    opacity: 1;
	    border-radius: 6px;
	    margin: 15px 0px;
	    width: 150px;
	}
	
	.topnav .login-container button {
	  float: right;
	  padding: 6px 10px;
	  margin-top: 8px;
	  margin-right: 16px;
	  background-color: transparent;
	  color: white;
	  font-size: 17px;
	  cursor: pointer;
	}
	.tabcontent {
		display: none;
	}
	.tab button.active {
		background-color: transparent;
	}
	/*.topnav .login-container button:hover {
	  background-color: green;
	}*/
	
	@media screen and (max-width: 600px) {
	  .topnav .login-container {
	    float: none;
	  }
	  .topnav a, .topnav input[type=text], .topnav .login-container button {
	    float: none;
	    display: block;
	    text-align: left;
	    width: 100%;
	    margin: 0;
	    padding: 14px;
	  }
	  .topnav input[type=text] {
	    border: 1px solid #ccc;  
	  }
	}
</style>
<div class="headar">
   <div class="col-md-4 hidden-xs hidden-sm">
      <div class="logo"> <a href="https://digimonk.co/tynelzweb/feed">
	  <img src="https://digimonk.co/tynelzweb/assets/site/images/logo.svg"> 
	  </a>
	  </div>
   </div>
   <div class="col-md-4">
      <div class="search-container">
	  
         <form action="https://digimonk.co/tynelzweb/search" method="post" class="srch">
            <input type="text" id="search_data" placeholder="Search.." name="search_data" autocomplete="off" onkeyup="ajaxSearch();">
            <input type="hidden" id="hiddenuserid" value="2">
            <button type="submit" name=""><i class="fa fa-search"></i></button>
            <!--<div id="suggestions">
                 <div id="autoSuggestionsList"></div>
             </div>-->
         </form>

      </div>
   </div>
   <div class="col-md-4">
  
<div class="dd jija">




         <ul class="nav navbar-nav navbar-right main-menu hidden-xs hidden-sm">
         		<button type="submit" class="buttonsign ">Login</button>
         			<button type="submit" class="buttonsign ">Sign Up</button>
           </ul>
         <!-- <a href="index.html">
                  <img src="images/drop.png">
                  </a> --> 
      </div>
</div>
</div>


 	<div class="container feed-cont">
		<div class="full">
			<div class="col-md-1 hidden-sm hidden-xs">
				 </div>
			<div class="col-md-12 widmain content265" style="padding-top: 25px;">
				<div class="feddtabs">
					<ul>
						<li id="feed_show" class="activebox">Feed</li>
						<li>|</li>
						<li id="info_show">Videos</li>
					</ul>
				</div>
				<div class="col-md-3 gic" id="videobox_show">
         <div class="rowww">
            <h4 class="gic2">Streams/Videos</h4>
            
                         <?php
                if(count($videodetail) > 0){
                foreach($videodetail as $videolist){
            
            $videoTitle = file_get_contents("https://www.googleapis.com/youtube/v3/videos?id=".$videolist['content']."&key=AIzaSyBe64aB8XtaZIV_5oHn_a4-YdXPnGsIW-o&fields=items(id,snippet(title),statistics)&part=snippet,statistics");
            
            $json = json_decode($videoTitle, true);
            //echo $updateuserdata['userid'];
            $getusername = $this->web_model->get_user_details($videolist['uid']);
           
            
            
?>
            <div class="col-md-12 vdo" style="padding: 0;">
              <?php if($videolist['type'] =='Twitch'){ ?>
                      <iframe    src="https://player.twitch.tv/?video=<?php echo $videolist['contentimg'];?>&autoplay=false" height="auto" width="100%" allowfullscreen="true"> </iframe>
                     <p style="font-size: 14px; margin: 2px 0;"> | @<?php echo $getusername[0]['username'] ?></p>
                     <?php 
                           
                       } else { 
					   
					preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $videolist['content'], $match);
					$youtube_id = $match[1];

                $youtubename =  $this->web_model->feedsideconvertYoutube($videolist['content']); 
				$ytitle = explode("/",$videolist['content']);
				
                 $feedlist['content']; if(strpos($youtubename, 'youtube') > 0) {  $youtubename; } ?>
                <div class="youtube" data-embed="<?php echo $youtube_id ?>">
					<div class="play-button"></div>
				</div>
               <p style="font-size: 14px; margin: 2px 0;"><?php    echo  $videotitle = $this->web_model->youtube_title($ytitle[3]); ?> | @<?php echo $getusername[0]['username'] ?></p>
               <?php }  ?>
            
            </div>
            <?php } }else {
            
            echo '<p style="padding: 15px;font-size: 13px;">No Subscription video.</p>';
            
            }  ?>
                       
                        
            
         </div>
      </div>
				<div class="col-md-6" id="feed_show_div">
					<div class="container"></div>
					<div class="two1 lngg hide-attachedicon">
						<div class="col-md-12 opver" style="padding-left:5px;">
							<div class="write">
								<img src="https://digimonk.co/tynelzweb/assets/site/images/usersimage/1579182173.png" class="llp online-user">
								<a href="#postModal" role="button"></a>
								<textarea class="fht" href="#postModal" data-toggle="modal" data-target="#guest_login_modal" placeholder="What is on your mind, Samurai?"></textarea> <span class="gtu">
                 <!-- <img src="https://digimonk.co/tynelzweb/assets/site/images/attachment1.png" style="  width: 20px;">-->
                  </span> 
							</div>
							<!--post modal-->
							<div class="tabu" id="tabu">
								<div class="tab">
									<button class="tablinks " value="top1" style="color: #fff;font-weight: normal;" onclick="openCity(event, 'London')">Top</button>
									<button class="tablinks" value="controversial1" style="color: #fff;font-weight: normal;" onclick="openCity(event, 'Paris')">Controversial</button>
									<button class="tablinks sel" value="new1" style="color: #fff;font-weight: normal;" onclick="openCity(event, 'Tokyo')">New</button>
								</div>
							</div>
							
							
							<div  id="London" class="tabcontent" style="display: none;">
							<?php
							 $output = '';
 
			$data = $this->db->query("SELECT tcp.* FROM tynelz_create_post as tcp WHERE   tcp.status=1 or tcp.uid in (SELECT tsl.s_uid FROM tynelz_subscriber_list as tsl WHERE   tsl.status=1 and tcp.status=1 )    order by feed_like desc limit 50")->result_array();
		 
		
							  if(count($data) > 0)
		        {   
		         $luserid=$updateuserdata['id'];
		     
			        foreach($data as $feedlist)
			        {
                   
                   $feeduserid = $feedlist['uid'];
                   $userfeeddata = $this->web_model->get_user_details($feeduserid);
                   $allpostlikedata = $this->web_model->get_postlikedata_byid($feedlist['id']);
                   $alluserpostlikedata = $this->web_model->get_userpostlikedata_byid($feedlist['id'],$updateuserdata['id']);
                   
                   $countcommentdata = $this->web_model->get_comment_bypid($feedlist['id']);
				   $checkhidepost = $this->web_model->check_hidepostby_userid_postid($feedlist['id'],$luserid);
				   
				   
				   $usersharefeeddata = $this->web_model->get_user_share_post($feeduserid,$feedlist['id']);
				   $shareuserdata1 = $this->web_model->get_user_details($usersharefeeddata[0]['s_uid']);
                   $feedshareusertime = $this->web_model->get_feed_detailsby_id($usersharefeeddata[0]['s_fid']);
                   
				   if($checkhidepost['0']['pid'] != $feedlist['id']){
				   
               ?>
               <div id="postid_<?php echo $feedlist['id'] ?>" class="call" style="margin-top:20px;">
                  <div class="col-md-12 strw">
                       <div class="dropdown">
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal">
                        <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"></a>
                        <ul class="dropdown-menu">
                            <?php if($feeduserid != $user){?> 
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" onclick='hide_post_by_user(this.id)'>Hide</a> </li>
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" onclick='report_post_by_user(this.id)'>Report</a></li>
                           <?php } else {?> 
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_post_by_user(this.id)'>Delete</a></li>
                             <?php } ?>
                        </ul>
                      </div>
                    
                  
                     <a href="<?php echo base_url() ?>user/<?php echo $userfeeddata[0]['username'] ?>">
                     <?php if($updateuserdata['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"   class="feeduserimg llp <?php if($userfeeddata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userfeeddata[0]['profile_img']?>"  class="feeduserimg llp <?php if($userfeeddata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } ?>
                     <h2> <?php echo $userfeeddata[0]['username'] ?> </h2>
                     </a>
                     <h3>
                            <?php

                                $postdate1 = $feedlist['create_date'];
                                
                                echo $this->web_model->facebook_time_ago($postdate1);
                                
								
                        		$filepath = base_url().'assets/site/images/post/'.$feedlist['contentimg'];
                        		$path_parts = pathinfo($filepath);
                        
                                $fileExtension = $path_parts['extension'];
                                
                                $youtubename = $this->web_model->convertYoutube($feedlist['content']);

		preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $feedlist['content'], $match);
		$youtube_id = $match[1];

    
                            ?>
                    </h3>
                    
                    <?php if($usersharefeeddata[0]['insert_pid'] == $feedlist['id'] ){ ?>
                    
                    <div class="shareusersec">
                     <a href="<?php echo base_url() ?>user/<?php echo $shareuserdata1[0]['username'] ?>">   
                    <?php if($shareuserdata1['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png" class="feeduserimg llp <?php if($shareuserdata1[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $shareuserdata1[0]['profile_img']?>" class="feeduserimg llp <?php if($shareuserdata1[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } ?>
                    <h2>
                        <?php  echo $shareuserdata1[0]['username'];  ?>
                    <br>
                       <span> <?php 
                                $postdate11 = $feedshareusertime[0]['create_date'];
                                
                                echo $this->web_model->facebook_time_ago($postdate11);
                                
								?>
								</span>
                    </h2>
                    </a>
                    </div>
                    <?php } ?>
                    
                    <p>
                        <?php 
						//echo $this->plain_url_to_link($feedlist['content']);
						echo $feedlist['content'];
						?>
                    </p>
                     
                     
                    
                  </div>
                  <div class="duty">
                    <?php 
                     if(strpos($youtubename, 'youtube') > 0) { $youtubename; ?>
							
							<div class="youtube" data-embed="<?php echo $youtube_id ?>">
								<div class="play-button"></div>
							</div>
							
					 <?php } 
                        if($feedlist['type'] =='Twitch'){ $twichimgclass = 'style="display:none;"'; ?>
						
                          <iframe    src="https://player.twitch.tv/?video=<?php echo $feedlist['contentimg'];?>&autoplay=false" height="315" width="100%" allowfullscreen="true"> </iframe>
                         <?php 
                               
                           } 
                   
                     
                     if($feedlist['contentimg'] !=''){  
                     
                    
                     
                     if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                  
                  <video controls style="width: 100%;">
                        <source src="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" type="video/mp4">
                </video>
                
               
                  <?php } else { 
				  
				  $post_gallery = $this->web_model->get_post_gallerty_bypid($feedlist['id']);
				  
				  
				  if(count($post_gallery)>0){
					  ?>
					  <div class="gallery">
						<div class="grid-sizer"></div>
						<?php
						$i=1;
					  foreach($post_gallery as $pglist){
						  if(count($post_gallery)==1){
							  ?>
							  <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
               
				</a>
								  
	<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
	<script>
	$(document).ready(function(){
		$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
			type: 'image',
		  mainClass: 'mfp-with-zoom', 
		  gallery:{
					enabled:true
				},

		  zoom: {
			enabled: true, 

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			opener: function(openerElement) {

			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
		}

		});

	});
	</script>	
				<?php
						  }
						  else{
				  ?>
				  
				   
					<div class="item">
					 <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" >
						<img src="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
					</a>
					</div>
						  
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>				  
		
                  
						  <?php 
						  
						  } $i++;} 
						  
						  echo '</div>'; 
						  
						  } else {
							  if($feedlist['contentimg'] !='logo.svg'){
							  ?>
						  
					  <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
               
				</a>
					
	<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
	<script>
	$(document).ready(function(){
		$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
			type: 'image',
		  mainClass: 'mfp-with-zoom', 
		  gallery:{
					enabled:true
				},

		  zoom: {
			enabled: true, 

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			opener: function(openerElement) {

			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
		}

		});

	});
	</script>
				<?php  
				  }  } } }  ?>
                  
                  
                  <textarea style="display:none;" id="feedcontent<?php echo $feedlist['id'] ?>"><?php echo $feedlist['content'];?></textarea>
                  
                  <input type="hidden" value="<?php echo $feedlist['contentimg'];?>" id="feedimage<?php echo $feedlist['id'] ?>">
                  
                     <div class="row like oldbox" style="margin: 0; padding:0;">
                    
                         
                        <div class="col-md-4 col-xs-4 repall " style="border-radius:0px;"> 
                            <a style="display:inline-block" data-toggle="modal" data-target="#guest_login_modal" id="<?php echo $feedlist['id'] ?>" class="button-style postlike checklike0<?php echo $feedlist['id'] ?> <?php if($alluserpostlikedata[0]['status'] ==1) { echo 'checklike1'; }  ?>" href="javascript:void(0)">+Rep | 
							<span id="postlikecount<?php echo $feedlist['id'] ?>"><?php echo count($allpostlikedata)?></span></a> 
                        </div>
                        
                        <div class="col-md-4 col-xs-4 comm">
                           <button type="button" class="comdrop" data-toggle="collapse" data-target="#comment<?php echo $feedlist['id'] ?>">
                                <span><i class="far fa-comment"></i></span> <span id="totalcomment<?php echo $feedlist['id'] ?>"><?php echo count($countcommentdata);?> </span>
                            </button>
                          
                        </div>
                        <div class="col-md-4 col-xs-4 errow" style="border-radius:0px;">
                            
                            <div class="dropdown"> 
                           <a class="dropdown-toggle" href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal" > <span><i class="fa fa-share"></i></span></a>
                              <div class="dropdown-menu"> 
                              <a class="copy_text" id="<?php echo $feedlist['id'] ?>" data-toggle="tooltip" href="<?php echo base_url()?>feed-detail/<?php echo $feedlist['id'] ?>">Copy Link</a>
                              <?php if($user != $feedlist['uid'] ){?>
                              <a class="sharefeed" id="<?php echo $feedlist['id'] ?>" href="javascript:void(0);">Share</a> 
                              <?php } ?>
                              </div>
                              
                          
                        </div>
                     </div>
                  </div>
                  <div id="comment<?php echo $feedlist['id'] ?>" class="color_bg-graylight collapse togleid">
                  <!--<div class="olmesrt">
                    <div class="dropdown">
                      <button class="dropdown-toggle comdrop oldbox_text" type="button" data-toggle="dropdown"><i class="fa fa-plus"></i></button>
                      <ul class="dropdown-menu">
                        <li><a class="newcommentlist" id="<?php echo $feedlist['id'] ?>">Newest</a></li>
                        <li><a class="oldcommentlist" id="<?php echo $feedlist['id'] ?>">Oldest</a></li>
                       
                      </ul>
                </div>
                    </div>-->
				  <div class="compic">
                   
				   <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>"> 
				  <?php if($user_sess['profile_img']==0){?>
				  <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png" class="feeduserimg llp <?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
				  <?php } else {?>
				  <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>" class="feeduserimg llp <?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
				  <?php } ?>
				  </a>
                        <div class="topbor">
                           <form id="comment_form<?php echo $feedlist['id'] ?>" action="#" method="post" enctype="multipart/form-data">
                               <div class="upload_newvcf">
							  <input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox" id="commentbox<?php echo $feedlist['id'] ?>" name="commentbox" placeholder="What are your thoughts, samurai?..." autocomplete='off'>
							  <input type="hidden" id="postid<?php echo $feedlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							  <input type="hidden" id="postuid<?php echo $feedlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							  <input type="hidden" id="comment_uid<?php echo $feedlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
							  <input type="file" onclick='getimgpreview(<?php echo $feedlist['id'] ?>)' name="image_file" id="image_file<?php echo $feedlist['id'] ?>"  class="upload-filebtn bg_attach">
                              
							</div>
							  
                           </form>
						   
                        </div>
                        
                     </div>
					 <div class="col-lg-11 text-center feed_preview_file_div"  id="feed_preview_file_div<?php echo $feedlist['id'] ?>"><ul></ul></div>
                     <div id="commentlist<?php echo $feedlist['id'] ?>" class="likerepot">
                         <div id="ajaxcommentlist<?php echo $feedlist['id'] ?>" class="likereport2"></div>
                        <div id="commentlistdata<?php echo $feedlist['id'] ?>" class="likerepot2">
                           <p class="entertopost">Press Enter to Post</p>
						   <?php 
						    $feedlist['id'];
								$getcommentdata = $this->web_model->get_comment_bypid($feedlist['id']);
								$count_comment = 0;
								foreach($getcommentdata as $commntlist){
								    
    								$comntuid = $commntlist['comment_uid'];
    								$userdata = $this->web_model->get_user_details($comntuid);
    								$countcommentrepdata = $this->web_model->get_commentreply_bycid($commntlist['id']);
    								
								    $countcommentlikedata = $this->web_model->get_commentlikedata_bycid($commntlist['id']);
								    
								    $commentlikedata = $this->web_model->get_usercommentlikedata_byid($commntlist['id'],$user);
								    
    								$cpostdate1 = $commntlist['cdate'];
    								
    								$commentdate = $this->web_model->facebook_time_ago($cpostdate1);
    								
                            $filepath = base_url().'assets/site/images/comment/'.$commntlist['contentimg'];
                        	$path_parts = pathinfo($filepath);
                        
                        $fileExtension = $path_parts['extension'];
                        
                        $youtubename = $this->web_model->convertYoutube($commntlist['comment']);


				   $checkhidecomment = $this->web_model->check_hidecommentby_userid_cid($commntlist['id'],$user);
    			
    			    if($checkhidecomment[0]['cid'] !=$commntlist['id']){
    			        if($count_comment < 5){
						   ?>
						   
						  <div class="col-md-12 commentlist<?php echo $commntlist['id'] ?> comment-section-list"> 
						 
                          
                          <div class="commentbox123">
                              <a href="<?php echo base_url() ?>user/<?php echo $userdata['0']['username'] ?>"> 
        						  <?php if($userdata['0']['profile_img'] == 0){ ?>
        						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;" >
        						   <?php } else { ?>
                                   <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userdata['0']['profile_img'] ?>"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
        						   <?php } ?>
                                   <h2><span style="color: #05c605;"><?php echo $userdata['0']['username'] ?></span></h2>
                                   </a>
                                   <a href="javascript:void(0)" class="commentdatebox"><?php echo $commentdate ?></a>
                                   <div class="dropdown kgiu">
                               
                               <div class="dropdown">
                                <a class="btn dropdown-toggle" data-toggle="modal" data-target="#guest_login_modal" type="button" data-toggle="dropdown">
                                    <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                <ul class="dropdown-menu">
                                     <?php if($userdata['0']['id']!= $user){ ?>
                                  <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcomment_by_user(this.id)'>Hide</a>   </li>
                                 <li>  <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='report_postcomment_by_user(this.id)'>Report</a>
                                 <input type="hidden" id="rcommentid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                 </li>
                                 
                                              <?php } else { ?>
                                              
                                           <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcomment_by_user(this.id)'>Delete</a>
                                           <input type="hidden" id="postid-<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>"></li>
                                              <?php } ?>
                                </ul>
                              </div>
                              
                                  </div>
                           </div>
                           
						  
                           
                           <h3 style="  word-break: break-word;"><?php echo $commntlist['comment'] ?></h3>
                             <p><?php  if(strpos($youtubename, 'youtube') > 0) { echo $youtubename; } ?></p>
                          
                          <div class="duty col-md-offset-2 ">
                              <?php if($commntlist['attach_img'] !='0'){  ?>
                          
                         
                          
                          <?php if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                          
                          <video controls style="width: 100%;">
                                <source src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['comment'];?>" type="video/mp4">
                        </video>
                        
                          <?php } else { ?>
                          
						  <a class="image-popup-vertical-fit<?php echo $commntlist["id"];?>" href="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" style="
    border-radius: 0;    width: 180px;    margin-left: -15px;    margin-top: 5px;    margin-bottom: 5px;">
                         
						</a>
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $commntlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>
						 <?php } } ?>
                          </div>
                           <div id="menu-outer">
                              <div class="table">
                               
                                 <ul id="horizontal-list2">
                                    <!--<li><a href="javascript:void(0)">rep | <span id="totalcommentreply<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?></span></a></li>-->
                                    <li><a href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal" id="<?php echo $commntlist['id'] ?>" class="totalcommentlike <?php if($commentlikedata[0]['status'] == '1') { echo 'commentreplike'; } ?>">+rep | <span id="totalcommentcidlike<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentlikedata) ?></span></a></li>
                                  
                                    <li><a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">reply</a></li>
                                    
                                    <li><a style="color: #3aa6ff;" id="<?php echo $commntlist['id'] ?>" class="comment-replybox replybox_new" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreplist<?php echo $commntlist['id'] ?>" aria-expanded="false">
                                        <?php if(count($countcommentrepdata) > 0){ ?>
                                        View <span id="totalcommentreply-cid<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?> </span> Reply <?php } ?></a></li>
                                    
                                 </ul>
                              </div>
							  <div id="commentreply<?php echo $commntlist['id'] ?>" class="collapse firstcomment_new" aria-expanded="false">
								<div class="col-md-2"></div>
								<div class="col-md-10">
								    <form id="comment_repform<?php echo $commntlist['id'] ?>" action="#" method="post" class="attachmentbox">
								        <p style="margin: 0;    padding-left: 40px;    padding-bottom: 5px;">Replying to <a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">X</a></p>
								      
								      <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>">   
									<?php if($user_sess['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } ?>
            						   </a>
            						   
									<input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox repcom comment-reply" id="commentreplybox<?php echo $commntlist['id'] ?>" name="commentreplybox" placeholder="<?php echo $userdata['0']['username'] ?>" value="<?php echo $userdata['0']['username'] ?> "><br><br><br><br>
									<input type="hidden" id="commentid<?php echo $commntlist['id'] ?>" name="commentid" value="<?php echo $commntlist['id'] ?>">
									<input type="hidden" id="postid<?php echo $commntlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							        <input type="hidden" id="postuid<?php echo $commntlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							        <input type="hidden" id="postcuid<?php echo $commntlist['id'] ?>" value="<?php echo $userdata['0']['id'] ?>" name="postcuid">
							        <input type="hidden" id="commentpostuid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['comment_uid'] ?>" name="commentpostuid">
							        <input type="hidden" id="comment_uid<?php echo $commntlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
                                     <span class="ink_utf">
							<img src="<?php echo base_url();?>assets/site/images/attachment1.png" style="  width:20px;">
							<input type="file" class="upload-filebtn" name="image_file" id="image_file"></i></span>
							        
							        </form>
							     
								</div>
							  </div>
							       <div class="repylistlimit<?php echo $commntlist['id'] ?>" style="display:none;">
							           </div>
							       <div id="commentreplist<?php echo $commntlist['id'] ?>" class="commentreplist_new collapse" aria-expanded="false"> 
								    <?php 
								        $countcr = 0;
								        foreach($countcommentrepdata as $crlist){
								            
								            $cruserdata = $this->web_model->get_user_details($crlist['comment_uid']);
								            $crpostdate1 = $crlist['cdate'];
								            
    								        $commentreplydate = $this->web_model->facebook_time_ago($crpostdate1);
    								
								    if($countcr < 5){
								    ?>
								    
								<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?>">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					<?php } else { ?>
            					
            					<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?> morereply<?php echo $commntlist['id'] ?>" style="display:none;">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					
                              <?php } $countcr++; } ?>
                              	<?php if($countcr > 5){ ?>
						    	<p class="viewcommentrep startcommentrep" id="<?php echo $commntlist['id'] ?>">View <?php echo $countcr-5; ?> replies <span class="">5 Of <?php echo $countcr ?></span></p>
						    	<!--<p class="viewcommentrep endcommentrep" id="<?php echo $commntlist['id'] ?>" style="display:none">View 0 replies <span class=""><?php echo $countcr ?> Of 0 </span></p>-->
                           <?php } ?>
                           
                              </div>
							
                           </div>
						   </div>
						   
                           <?php } else {?>
                           
                          
                            <div class="col-md-12 gg commentlist<?php echo $commntlist['id'] ?> comment-section-list morecomment<?php echo $feedlist['id'] ?>" style="display:none;"> 
						 
                          
                          <div class="commentbox123">
                              <a href="<?php echo base_url() ?>user/<?php echo $userdata['0']['username'] ?>"> 
						  <?php if($userdata['0']['profile_img'] == 0){ ?>
						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;" >
						   <?php } else { ?>
                           <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userdata['0']['profile_img'] ?>"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
						   <?php } ?>
                           <h2><span style="color: #05c605;"><?php echo $userdata['0']['username'] ?></span></h2>
                           </a>
                           <a href="javascript:void(0)" class="commentdatebox"><?php echo $commentdate ?></a>
                           <div class="dropdown kgiu">
                       
                       <div class="dropdown">
                        <a data-toggle="modal" data-target="#guest_login_modal"  class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                            <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                        <ul class="dropdown-menu">
                             <?php if($userdata['0']['id']!= $user){ ?>
                          <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcomment_by_user(this.id)'>Hide</a>   </li>
                         <li>  <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='report_postcomment_by_user(this.id)'>Report</a>
                         <input type="hidden" id="rcommentid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                         </li>
                         
                                      <?php } else { ?>
                                      
                                   <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcomment_by_user(this.id)'>Delete</a>
                                   <input type="hidden" id="postid-<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>"></li>
                                      <?php } ?>
                        </ul>
                      </div>
                      
                          </div>
                           </div>
                           
						  
                           
                           <h3 style="  word-break: break-word;"><?php echo $commntlist['comment'] ?></h3>
                             <p><?php  if(strpos($youtubename, 'youtube') > 0) { echo $youtubename; } ?></p>
                          
                          <div class="duty col-md-offset-2 ">
                              <?php if($commntlist['attach_img'] !='0'){  ?>
                          
                         
                          
                          <?php if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                          
                          <video controls style="width: 100%;">
                                <source src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['comment'];?>" type="video/mp4">
                        </video>
                        
                          <?php } else { ?>
                          
						  <a class="image-popup-vertical-fit<?php echo $commntlist["id"];?>" href="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" style="
    border-radius: 0;    width: 180px;    margin-left: -15px;    margin-top: 5px;    margin-bottom: 5px;">
                          </a>
						  
							
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $commntlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>

						  <?php } } ?>
                          </div>
                           <div id="menu-outer">
                              <div class="table">
                               
                                 <ul id="horizontal-list2">
                                    <!--<li><a href="javascript:void(0)">rep | <span id="totalcommentreply<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?></span></a></li>-->
                                    <li><a href="javascript:void(0)" id="<?php echo $commntlist['id'] ?>" class="totalcommentlike <?php if($commentlikedata[0]['status'] == '1') { echo 'commentreplike'; } ?>">+rep | <span id="totalcommentcidlike<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentlikedata) ?></span></a></li>
                                  
                                    <li><a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">reply</a></li>
                                    
                                    <li><a style="color: #3aa6ff;" id="<?php echo $commntlist['id'] ?>" class="comment-replybox replybox_new" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreplist<?php echo $commntlist['id'] ?>" aria-expanded="false">View 
                                    <span id="totalcommentreply-cid<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?> </span> Reply</a></li>
                                    
                                 </ul>
                              </div>
							  <div id="commentreply<?php echo $commntlist['id'] ?>" class="collapse firstcomment_new" aria-expanded="false">
								<div class="col-md-2"></div>
								<div class="col-md-10">
								    <form id="comment_repform<?php echo $commntlist['id'] ?>" action="#" method="post" class="attachmentbox">
								        <p style="margin: 0;    padding-left: 40px;    padding-bottom: 5px;">Replying to <?php echo $userdata['0']['username'] ?></p>
								      
								      <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>">   
									<?php if($user_sess['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } ?>
            						   </a>
            						   
									<input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox repcom comment-reply" id="commentreplybox<?php echo $commntlist['id'] ?>" name="commentreplybox" placeholder="<?php echo $userdata['0']['username'] ?>" value="<?php echo $userdata['0']['username'] ?>"><br><br><br><br>
									<input type="hidden" id="commentid<?php echo $commntlist['id'] ?>" name="commentid" value="<?php echo $commntlist['id'] ?>">
									<input type="hidden" id="postid<?php echo $commntlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							        <input type="hidden" id="postuid<?php echo $commntlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							        <input type="hidden" id="postcuid<?php echo $commntlist['id'] ?>" value="<?php echo $userdata['0']['id'] ?>" name="postcuid">
							        <input type="hidden" id="commentpostuid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['comment_uid'] ?>" name="commentpostuid">
							        <input type="hidden" id="comment_uid<?php echo $commntlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
                                     <span class="ink_utf">
							<img src="<?php echo base_url();?>assets/site/images/attachment1.png" style="  width:20px;">
							<input type="file" class="upload-filebtn" name="image_file" id="image_file"></i></span>
							        
							        </form>
							     
								</div>
							  </div>
							       
							       <div id="commentreplist<?php echo $commntlist['id'] ?>" class="commentreplist_new collapse" aria-expanded="false"> 
								    <?php 
								        
								        $countcr=0;
								        foreach($countcommentrepdata as $crlist){
								            
								            $cruserdata = $this->web_model->get_user_details($crlist['comment_uid']);
								            $crpostdate1 = $crlist['cdate'];
								            
    								        $commentreplydate = $this->web_model->facebook_time_ago($crpostdate1);
    								
								  if($countcr < 5){
								    ?>
								    
								<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?>">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a class="btn dropdown-toggle" data-toggle="modal" data-target="#guest_login_modal" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					<?php } else { ?>
            					
            					<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?> morereply<?php echo $commntlist['id'] ?>" style="display:none;">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					
                                      <?php } $countcr++; } ?>
                                      	<?php if($countcr > 5){ ?>
        						    	<p class="viewcommentrep startcommentrep" id="<?php echo $commntlist['id'] ?>">View <?php echo $countcr-5; ?> replies <span class="">5 Of <?php echo $countcr ?></span></p>
						    <!--	<p class="viewcommentrep endcommentrep" id="<?php echo $commntlist['id'] ?>" style="display:none">View 0 replies <span class=""><?php echo $countcr ?> Of 0 </span></p>-->
                                   <?php } ?>
                           
                              </div>
							
                           </div>
						   </div>
                           
                           <?php } ?>
							<?php } $count_comment++; } ?>
							<?php if($count_comment > 5){ ?>
							<p class="viewcomment startcomment" id="<?php echo $feedlist['id'] ?>">View <?php echo $count_comment-5; ?> Comments <span class="">5 Of <?php echo $count_comment ?></span></p>
							<!--<p class="viewcomment endcomment" id="<?php echo $feedlist['id'] ?>" style="display:none;">View 0 Comment <span class=""><?php echo $count_comment ?> Of 0</span></p>-->
                           <?php } ?>
                        </div>
                     </div>
				  </div>
                 
               </div>
               </div>
               <?php } } }  
               else {
                   //echo '<div class="no-feed-list"><img src="'.base_url().'assets/site/images/svg/no_feed_icon.png"></div>';
               }
			   ?>
							</div>
							<div id="Paris" class="tabcontent" style="display: none;">
								
								<?php
							 $output = '';
 
			$data = $this->db->query("SELECT tcp.* FROM tynelz_create_post as tcp WHERE   tcp.status=1 or tcp.uid in (SELECT tsl.s_uid FROM tynelz_subscriber_list as tsl WHERE   tsl.status=1 and tcp.status=1 )    order by feed_comment desc limit 50")->result_array();
		 
		
							  if(count($data) > 0)
		        {   
		         $luserid=$updateuserdata['id'];
		     
			        foreach($data as $feedlist)
			        {
                   
                   $feeduserid = $feedlist['uid'];
                   $userfeeddata = $this->web_model->get_user_details($feeduserid);
                   $allpostlikedata = $this->web_model->get_postlikedata_byid($feedlist['id']);
                   $alluserpostlikedata = $this->web_model->get_userpostlikedata_byid($feedlist['id'],$updateuserdata['id']);
                   
                   $countcommentdata = $this->web_model->get_comment_bypid($feedlist['id']);
				   $checkhidepost = $this->web_model->check_hidepostby_userid_postid($feedlist['id'],$luserid);
				   
				   
				   $usersharefeeddata = $this->web_model->get_user_share_post($feeduserid,$feedlist['id']);
				   $shareuserdata1 = $this->web_model->get_user_details($usersharefeeddata[0]['s_uid']);
                   $feedshareusertime = $this->web_model->get_feed_detailsby_id($usersharefeeddata[0]['s_fid']);
                   
				   if($checkhidepost['0']['pid'] != $feedlist['id']){
				   
               ?>
               <div id="postid_<?php echo $feedlist['id'] ?>" class="call" style="margin-top:20px;">
                  <div class="col-md-12 strw">
                       <div class="dropdown">
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal">
                        <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"></a>
                        <ul class="dropdown-menu">
                            <?php if($feeduserid != $user){?> 
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" onclick='hide_post_by_user(this.id)'>Hide</a> </li>
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" onclick='report_post_by_user(this.id)'>Report</a></li>
                           <?php } else {?> 
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_post_by_user(this.id)'>Delete</a></li>
                             <?php } ?>
                        </ul>
                      </div>
                    
                  
                     <a href="<?php echo base_url() ?>user/<?php echo $userfeeddata[0]['username'] ?>">
                     <?php if($updateuserdata['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"   class="feeduserimg llp <?php if($userfeeddata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userfeeddata[0]['profile_img']?>"  class="feeduserimg llp <?php if($userfeeddata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } ?>
                     <h2> <?php echo $userfeeddata[0]['username'] ?> </h2>
                     </a>
                     <h3>
                            <?php

                                $postdate1 = $feedlist['create_date'];
                                
                                echo $this->web_model->facebook_time_ago($postdate1);
                                
								
                        		$filepath = base_url().'assets/site/images/post/'.$feedlist['contentimg'];
                        		$path_parts = pathinfo($filepath);
                        
                                $fileExtension = $path_parts['extension'];
                                
                                $youtubename = $this->web_model->convertYoutube($feedlist['content']);

		preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $feedlist['content'], $match);
		$youtube_id = $match[1];

    
                            ?>
                    </h3>
                    
                    <?php if($usersharefeeddata[0]['insert_pid'] == $feedlist['id'] ){ ?>
                    
                    <div class="shareusersec">
                     <a href="<?php echo base_url() ?>user/<?php echo $shareuserdata1[0]['username'] ?>">   
                    <?php if($shareuserdata1['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png" class="feeduserimg llp <?php if($shareuserdata1[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $shareuserdata1[0]['profile_img']?>" class="feeduserimg llp <?php if($shareuserdata1[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } ?>
                    <h2>
                        <?php  echo $shareuserdata1[0]['username'];  ?>
                    <br>
                       <span> <?php 
                                $postdate11 = $feedshareusertime[0]['create_date'];
                                
                                echo $this->web_model->facebook_time_ago($postdate11);
                                
								?>
								</span>
                    </h2>
                    </a>
                    </div>
                    <?php } ?>
                    
                    <p>
                        <?php 
						//echo $this->plain_url_to_link($feedlist['content']);
						echo $feedlist['content'];
						?>
                    </p>
                     
                     
                    
                  </div>
                  <div class="duty">
                    <?php 
                     if(strpos($youtubename, 'youtube') > 0) { $youtubename; ?>
							
							<div class="youtube" data-embed="<?php echo $youtube_id ?>">
								<div class="play-button"></div>
							</div>
							
					 <?php } 
                        if($feedlist['type'] =='Twitch'){ $twichimgclass = 'style="display:none;"'; ?>
						
                          <iframe    src="https://player.twitch.tv/?video=<?php echo $feedlist['contentimg'];?>&autoplay=false" height="315" width="100%" allowfullscreen="true"> </iframe>
                         <?php 
                               
                           } 
                   
                     
                     if($feedlist['contentimg'] !=''){  
                     
                    
                     
                     if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                  
                  <video controls style="width: 100%;">
                        <source src="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" type="video/mp4">
                </video>
                
               
                  <?php } else { 
				  
				  $post_gallery = $this->web_model->get_post_gallerty_bypid($feedlist['id']);
				  
				  
				  if(count($post_gallery)>0){
					  ?>
					  <div class="gallery">
						<div class="grid-sizer"></div>
						<?php
						$i=1;
					  foreach($post_gallery as $pglist){
						  if(count($post_gallery)==1){
							  ?>
							  <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
               
				</a>
								  
	<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
	<script>
	$(document).ready(function(){
		$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
			type: 'image',
		  mainClass: 'mfp-with-zoom', 
		  gallery:{
					enabled:true
				},

		  zoom: {
			enabled: true, 

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			opener: function(openerElement) {

			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
		}

		});

	});
	</script>	
				<?php
						  }
						  else{
				  ?>
				  
				   
					<div class="item">
					 <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" >
						<img src="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
					</a>
					</div>
						  
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>				  
		
                  
						  <?php 
						  
						  } $i++;} 
						  
						  echo '</div>'; 
						  
						  } else {
							  if($feedlist['contentimg'] !='logo.svg'){
							  ?>
						  
					  <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
               
				</a>
					
	<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
	<script>
	$(document).ready(function(){
		$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
			type: 'image',
		  mainClass: 'mfp-with-zoom', 
		  gallery:{
					enabled:true
				},

		  zoom: {
			enabled: true, 

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			opener: function(openerElement) {

			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
		}

		});

	});
	</script>
				<?php  
				  }  } } }  ?>
                  
                  
                  <textarea style="display:none;" id="feedcontent<?php echo $feedlist['id'] ?>"><?php echo $feedlist['content'];?></textarea>
                  
                  <input type="hidden" value="<?php echo $feedlist['contentimg'];?>" id="feedimage<?php echo $feedlist['id'] ?>">
                  
                     <div class="row like oldbox" style="margin: 0; padding:0;">
                    
                         
                        <div class="col-md-4 col-xs-4 repall " style="border-radius:0px;"> 
                            <a style="display:inline-block" data-toggle="modal" data-target="#guest_login_modal" id="<?php echo $feedlist['id'] ?>" class="button-style postlike checklike0<?php echo $feedlist['id'] ?> <?php if($alluserpostlikedata[0]['status'] ==1) { echo 'checklike1'; }  ?>" href="javascript:void(0)">+Rep | 
							<span id="postlikecount<?php echo $feedlist['id'] ?>"><?php echo count($allpostlikedata)?></span></a> 
                        </div>
                        
                        <div class="col-md-4 col-xs-4 comm">
                           <button type="button" class="comdrop" data-toggle="collapse" data-target="#comment<?php echo $feedlist['id'] ?>">
                                <span><i class="far fa-comment"></i></span> <span id="totalcomment<?php echo $feedlist['id'] ?>"><?php echo count($countcommentdata);?> </span>
                            </button>
                          
                        </div>
                        <div class="col-md-4 col-xs-4 errow" style="border-radius:0px;">
                            
                            <div class="dropdown"> 
                           <a class="dropdown-toggle" href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal" > <span><i class="fa fa-share"></i></span></a>
                              <div class="dropdown-menu"> 
                              <a class="copy_text" id="<?php echo $feedlist['id'] ?>" data-toggle="tooltip" href="<?php echo base_url()?>feed-detail/<?php echo $feedlist['id'] ?>">Copy Link</a>
                              <?php if($user != $feedlist['uid'] ){?>
                              <a class="sharefeed" id="<?php echo $feedlist['id'] ?>" href="javascript:void(0);">Share</a> 
                              <?php } ?>
                              </div>
                              
                          
                        </div>
                     </div>
                  </div>
                  <div id="comment<?php echo $feedlist['id'] ?>" class="color_bg-graylight collapse togleid">
                  <!--<div class="olmesrt">
                    <div class="dropdown">
                      <button class="dropdown-toggle comdrop oldbox_text" type="button" data-toggle="dropdown"><i class="fa fa-plus"></i></button>
                      <ul class="dropdown-menu">
                        <li><a class="newcommentlist" id="<?php echo $feedlist['id'] ?>">Newest</a></li>
                        <li><a class="oldcommentlist" id="<?php echo $feedlist['id'] ?>">Oldest</a></li>
                       
                      </ul>
                </div>
                    </div>-->
				  <div class="compic">
                   
				   <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>"> 
				  <?php if($user_sess['profile_img']==0){?>
				  <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png" class="feeduserimg llp <?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
				  <?php } else {?>
				  <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>" class="feeduserimg llp <?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
				  <?php } ?>
				  </a>
                        <div class="topbor">
                           <form id="comment_form<?php echo $feedlist['id'] ?>" action="#" method="post" enctype="multipart/form-data">
                               <div class="upload_newvcf">
							  <input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox" id="commentbox<?php echo $feedlist['id'] ?>" name="commentbox" placeholder="What are your thoughts, samurai?..." autocomplete='off'>
							  <input type="hidden" id="postid<?php echo $feedlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							  <input type="hidden" id="postuid<?php echo $feedlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							  <input type="hidden" id="comment_uid<?php echo $feedlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
							  <input type="file" onclick='getimgpreview(<?php echo $feedlist['id'] ?>)' name="image_file" id="image_file<?php echo $feedlist['id'] ?>"  class="upload-filebtn bg_attach">
                              
							</div>
							  
                           </form>
						   
                        </div>
                        
                     </div>
					 <div class="col-lg-11 text-center feed_preview_file_div"  id="feed_preview_file_div<?php echo $feedlist['id'] ?>"><ul></ul></div>
                     <div id="commentlist<?php echo $feedlist['id'] ?>" class="likerepot">
                         <div id="ajaxcommentlist<?php echo $feedlist['id'] ?>" class="likereport2"></div>
                        <div id="commentlistdata<?php echo $feedlist['id'] ?>" class="likerepot2">
                           <p class="entertopost">Press Enter to Post</p>
						   <?php 
						    $feedlist['id'];
								$getcommentdata = $this->web_model->get_comment_bypid($feedlist['id']);
								$count_comment = 0;
								foreach($getcommentdata as $commntlist){
								    
    								$comntuid = $commntlist['comment_uid'];
    								$userdata = $this->web_model->get_user_details($comntuid);
    								$countcommentrepdata = $this->web_model->get_commentreply_bycid($commntlist['id']);
    								
								    $countcommentlikedata = $this->web_model->get_commentlikedata_bycid($commntlist['id']);
								    
								    $commentlikedata = $this->web_model->get_usercommentlikedata_byid($commntlist['id'],$user);
								    
    								$cpostdate1 = $commntlist['cdate'];
    								
    								$commentdate = $this->web_model->facebook_time_ago($cpostdate1);
    								
                            $filepath = base_url().'assets/site/images/comment/'.$commntlist['contentimg'];
                        	$path_parts = pathinfo($filepath);
                        
                        $fileExtension = $path_parts['extension'];
                        
                        $youtubename = $this->web_model->convertYoutube($commntlist['comment']);


				   $checkhidecomment = $this->web_model->check_hidecommentby_userid_cid($commntlist['id'],$user);
    			
    			    if($checkhidecomment[0]['cid'] !=$commntlist['id']){
    			        if($count_comment < 5){
						   ?>
						   
						  <div class="col-md-12 commentlist<?php echo $commntlist['id'] ?> comment-section-list"> 
						 
                          
                          <div class="commentbox123">
                              <a href="<?php echo base_url() ?>user/<?php echo $userdata['0']['username'] ?>"> 
        						  <?php if($userdata['0']['profile_img'] == 0){ ?>
        						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;" >
        						   <?php } else { ?>
                                   <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userdata['0']['profile_img'] ?>"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
        						   <?php } ?>
                                   <h2><span style="color: #05c605;"><?php echo $userdata['0']['username'] ?></span></h2>
                                   </a>
                                   <a href="javascript:void(0)" class="commentdatebox"><?php echo $commentdate ?></a>
                                   <div class="dropdown kgiu">
                               
                               <div class="dropdown">
                                <a class="btn dropdown-toggle" data-toggle="modal" data-target="#guest_login_modal" type="button" data-toggle="dropdown">
                                    <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                <ul class="dropdown-menu">
                                     <?php if($userdata['0']['id']!= $user){ ?>
                                  <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcomment_by_user(this.id)'>Hide</a>   </li>
                                 <li>  <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='report_postcomment_by_user(this.id)'>Report</a>
                                 <input type="hidden" id="rcommentid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                 </li>
                                 
                                              <?php } else { ?>
                                              
                                           <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcomment_by_user(this.id)'>Delete</a>
                                           <input type="hidden" id="postid-<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>"></li>
                                              <?php } ?>
                                </ul>
                              </div>
                              
                                  </div>
                           </div>
                           
						  
                           
                           <h3 style="  word-break: break-word;"><?php echo $commntlist['comment'] ?></h3>
                             <p><?php  if(strpos($youtubename, 'youtube') > 0) { echo $youtubename; } ?></p>
                          
                          <div class="duty col-md-offset-2 ">
                              <?php if($commntlist['attach_img'] !='0'){  ?>
                          
                         
                          
                          <?php if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                          
                          <video controls style="width: 100%;">
                                <source src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['comment'];?>" type="video/mp4">
                        </video>
                        
                          <?php } else { ?>
                          
						  <a class="image-popup-vertical-fit<?php echo $commntlist["id"];?>" href="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" style="
    border-radius: 0;    width: 180px;    margin-left: -15px;    margin-top: 5px;    margin-bottom: 5px;">
                         
						</a>
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $commntlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>
						 <?php } } ?>
                          </div>
                           <div id="menu-outer">
                              <div class="table">
                               
                                 <ul id="horizontal-list2">
                                    <!--<li><a href="javascript:void(0)">rep | <span id="totalcommentreply<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?></span></a></li>-->
                                    <li><a href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal" id="<?php echo $commntlist['id'] ?>" class="totalcommentlike <?php if($commentlikedata[0]['status'] == '1') { echo 'commentreplike'; } ?>">+rep | <span id="totalcommentcidlike<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentlikedata) ?></span></a></li>
                                  
                                    <li><a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">reply</a></li>
                                    
                                    <li><a style="color: #3aa6ff;" id="<?php echo $commntlist['id'] ?>" class="comment-replybox replybox_new" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreplist<?php echo $commntlist['id'] ?>" aria-expanded="false">
                                        <?php if(count($countcommentrepdata) > 0){ ?>
                                        View <span id="totalcommentreply-cid<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?> </span> Reply <?php } ?></a></li>
                                    
                                 </ul>
                              </div>
							  <div id="commentreply<?php echo $commntlist['id'] ?>" class="collapse firstcomment_new" aria-expanded="false">
								<div class="col-md-2"></div>
								<div class="col-md-10">
								    <form id="comment_repform<?php echo $commntlist['id'] ?>" action="#" method="post" class="attachmentbox">
								        <p style="margin: 0;    padding-left: 40px;    padding-bottom: 5px;">Replying to <a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">X</a></p>
								      
								      <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>">   
									<?php if($user_sess['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } ?>
            						   </a>
            						   
									<input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox repcom comment-reply" id="commentreplybox<?php echo $commntlist['id'] ?>" name="commentreplybox" placeholder="<?php echo $userdata['0']['username'] ?>" value="<?php echo $userdata['0']['username'] ?> "><br><br><br><br>
									<input type="hidden" id="commentid<?php echo $commntlist['id'] ?>" name="commentid" value="<?php echo $commntlist['id'] ?>">
									<input type="hidden" id="postid<?php echo $commntlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							        <input type="hidden" id="postuid<?php echo $commntlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							        <input type="hidden" id="postcuid<?php echo $commntlist['id'] ?>" value="<?php echo $userdata['0']['id'] ?>" name="postcuid">
							        <input type="hidden" id="commentpostuid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['comment_uid'] ?>" name="commentpostuid">
							        <input type="hidden" id="comment_uid<?php echo $commntlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
                                     <span class="ink_utf">
							<img src="<?php echo base_url();?>assets/site/images/attachment1.png" style="  width:20px;">
							<input type="file" class="upload-filebtn" name="image_file" id="image_file"></i></span>
							        
							        </form>
							     
								</div>
							  </div>
							       <div class="repylistlimit<?php echo $commntlist['id'] ?>" style="display:none;">
							           </div>
							       <div id="commentreplist<?php echo $commntlist['id'] ?>" class="commentreplist_new collapse" aria-expanded="false"> 
								    <?php 
								        $countcr = 0;
								        foreach($countcommentrepdata as $crlist){
								            
								            $cruserdata = $this->web_model->get_user_details($crlist['comment_uid']);
								            $crpostdate1 = $crlist['cdate'];
								            
    								        $commentreplydate = $this->web_model->facebook_time_ago($crpostdate1);
    								
								    if($countcr < 5){
								    ?>
								    
								<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?>">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					<?php } else { ?>
            					
            					<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?> morereply<?php echo $commntlist['id'] ?>" style="display:none;">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					
                              <?php } $countcr++; } ?>
                              	<?php if($countcr > 5){ ?>
						    	<p class="viewcommentrep startcommentrep" id="<?php echo $commntlist['id'] ?>">View <?php echo $countcr-5; ?> replies <span class="">5 Of <?php echo $countcr ?></span></p>
						    	<!--<p class="viewcommentrep endcommentrep" id="<?php echo $commntlist['id'] ?>" style="display:none">View 0 replies <span class=""><?php echo $countcr ?> Of 0 </span></p>-->
                           <?php } ?>
                           
                              </div>
							
                           </div>
						   </div>
						   
                           <?php } else {?>
                           
                          
                            <div class="col-md-12 gg commentlist<?php echo $commntlist['id'] ?> comment-section-list morecomment<?php echo $feedlist['id'] ?>" style="display:none;"> 
						 
                          
                          <div class="commentbox123">
                              <a href="<?php echo base_url() ?>user/<?php echo $userdata['0']['username'] ?>"> 
						  <?php if($userdata['0']['profile_img'] == 0){ ?>
						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;" >
						   <?php } else { ?>
                           <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userdata['0']['profile_img'] ?>"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
						   <?php } ?>
                           <h2><span style="color: #05c605;"><?php echo $userdata['0']['username'] ?></span></h2>
                           </a>
                           <a href="javascript:void(0)" class="commentdatebox"><?php echo $commentdate ?></a>
                           <div class="dropdown kgiu">
                       
                       <div class="dropdown">
                        <a data-toggle="modal" data-target="#guest_login_modal"  class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                            <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                        <ul class="dropdown-menu">
                             <?php if($userdata['0']['id']!= $user){ ?>
                          <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcomment_by_user(this.id)'>Hide</a>   </li>
                         <li>  <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='report_postcomment_by_user(this.id)'>Report</a>
                         <input type="hidden" id="rcommentid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                         </li>
                         
                                      <?php } else { ?>
                                      
                                   <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcomment_by_user(this.id)'>Delete</a>
                                   <input type="hidden" id="postid-<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>"></li>
                                      <?php } ?>
                        </ul>
                      </div>
                      
                          </div>
                           </div>
                           
						  
                           
                           <h3 style="  word-break: break-word;"><?php echo $commntlist['comment'] ?></h3>
                             <p><?php  if(strpos($youtubename, 'youtube') > 0) { echo $youtubename; } ?></p>
                          
                          <div class="duty col-md-offset-2 ">
                              <?php if($commntlist['attach_img'] !='0'){  ?>
                          
                         
                          
                          <?php if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                          
                          <video controls style="width: 100%;">
                                <source src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['comment'];?>" type="video/mp4">
                        </video>
                        
                          <?php } else { ?>
                          
						  <a class="image-popup-vertical-fit<?php echo $commntlist["id"];?>" href="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" style="
    border-radius: 0;    width: 180px;    margin-left: -15px;    margin-top: 5px;    margin-bottom: 5px;">
                          </a>
						  
							
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $commntlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>

						  <?php } } ?>
                          </div>
                           <div id="menu-outer">
                              <div class="table">
                               
                                 <ul id="horizontal-list2">
                                    <!--<li><a href="javascript:void(0)">rep | <span id="totalcommentreply<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?></span></a></li>-->
                                    <li><a href="javascript:void(0)" id="<?php echo $commntlist['id'] ?>" class="totalcommentlike <?php if($commentlikedata[0]['status'] == '1') { echo 'commentreplike'; } ?>">+rep | <span id="totalcommentcidlike<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentlikedata) ?></span></a></li>
                                  
                                    <li><a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">reply</a></li>
                                    
                                    <li><a style="color: #3aa6ff;" id="<?php echo $commntlist['id'] ?>" class="comment-replybox replybox_new" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreplist<?php echo $commntlist['id'] ?>" aria-expanded="false">View 
                                    <span id="totalcommentreply-cid<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?> </span> Reply</a></li>
                                    
                                 </ul>
                              </div>
							  <div id="commentreply<?php echo $commntlist['id'] ?>" class="collapse firstcomment_new" aria-expanded="false">
								<div class="col-md-2"></div>
								<div class="col-md-10">
								    <form id="comment_repform<?php echo $commntlist['id'] ?>" action="#" method="post" class="attachmentbox">
								        <p style="margin: 0;    padding-left: 40px;    padding-bottom: 5px;">Replying to <?php echo $userdata['0']['username'] ?></p>
								      
								      <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>">   
									<?php if($user_sess['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } ?>
            						   </a>
            						   
									<input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox repcom comment-reply" id="commentreplybox<?php echo $commntlist['id'] ?>" name="commentreplybox" placeholder="<?php echo $userdata['0']['username'] ?>" value="<?php echo $userdata['0']['username'] ?>"><br><br><br><br>
									<input type="hidden" id="commentid<?php echo $commntlist['id'] ?>" name="commentid" value="<?php echo $commntlist['id'] ?>">
									<input type="hidden" id="postid<?php echo $commntlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							        <input type="hidden" id="postuid<?php echo $commntlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							        <input type="hidden" id="postcuid<?php echo $commntlist['id'] ?>" value="<?php echo $userdata['0']['id'] ?>" name="postcuid">
							        <input type="hidden" id="commentpostuid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['comment_uid'] ?>" name="commentpostuid">
							        <input type="hidden" id="comment_uid<?php echo $commntlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
                                     <span class="ink_utf">
							<img src="<?php echo base_url();?>assets/site/images/attachment1.png" style="  width:20px;">
							<input type="file" class="upload-filebtn" name="image_file" id="image_file"></i></span>
							        
							        </form>
							     
								</div>
							  </div>
							       
							       <div id="commentreplist<?php echo $commntlist['id'] ?>" class="commentreplist_new collapse" aria-expanded="false"> 
								    <?php 
								        
								        $countcr=0;
								        foreach($countcommentrepdata as $crlist){
								            
								            $cruserdata = $this->web_model->get_user_details($crlist['comment_uid']);
								            $crpostdate1 = $crlist['cdate'];
								            
    								        $commentreplydate = $this->web_model->facebook_time_ago($crpostdate1);
    								
								  if($countcr < 5){
								    ?>
								    
								<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?>">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a class="btn dropdown-toggle" data-toggle="modal" data-target="#guest_login_modal" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					<?php } else { ?>
            					
            					<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?> morereply<?php echo $commntlist['id'] ?>" style="display:none;">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					
                                      <?php } $countcr++; } ?>
                                      	<?php if($countcr > 5){ ?>
        						    	<p class="viewcommentrep startcommentrep" id="<?php echo $commntlist['id'] ?>">View <?php echo $countcr-5; ?> replies <span class="">5 Of <?php echo $countcr ?></span></p>
						    <!--	<p class="viewcommentrep endcommentrep" id="<?php echo $commntlist['id'] ?>" style="display:none">View 0 replies <span class=""><?php echo $countcr ?> Of 0 </span></p>-->
                                   <?php } ?>
                           
                              </div>
							
                           </div>
						   </div>
                           
                           <?php } ?>
							<?php } $count_comment++; } ?>
							<?php if($count_comment > 5){ ?>
							<p class="viewcomment startcomment" id="<?php echo $feedlist['id'] ?>">View <?php echo $count_comment-5; ?> Comments <span class="">5 Of <?php echo $count_comment ?></span></p>
							<!--<p class="viewcomment endcomment" id="<?php echo $feedlist['id'] ?>" style="display:none;">View 0 Comment <span class=""><?php echo $count_comment ?> Of 0</span></p>-->
                           <?php } ?>
                        </div>
                     </div>
				  </div>
                 
               </div>
               </div>
               <?php } } }  
               else {
                   //echo '<div class="no-feed-list"><img src="'.base_url().'assets/site/images/svg/no_feed_icon.png"></div>';
               }
			   ?>
			   
							</div>
							 <div  id="Tokyo" class="tabcontent" style="display: block;">
<?php 
							 
							 $output = '';
 
			$data = $this->db->query("SELECT tcp.* FROM tynelz_create_post as tcp WHERE   tcp.status=1 or tcp.uid in (SELECT tsl.s_uid FROM tynelz_subscriber_list as tsl WHERE   tsl.status=1 and tcp.status=1 )    order by id desc limit 50")->result_array();
		 
		
							  if(count($data) > 0)
		        {   
		         $luserid=$updateuserdata['id'];
		     
			        foreach($data as $feedlist)
			        {
                   
                   $feeduserid = $feedlist['uid'];
                   $userfeeddata = $this->web_model->get_user_details($feeduserid);
                   $allpostlikedata = $this->web_model->get_postlikedata_byid($feedlist['id']);
                   $alluserpostlikedata = $this->web_model->get_userpostlikedata_byid($feedlist['id'],$updateuserdata['id']);
                   
                   $countcommentdata = $this->web_model->get_comment_bypid($feedlist['id']);
				   $checkhidepost = $this->web_model->check_hidepostby_userid_postid($feedlist['id'],$luserid);
				   
				   
				   $usersharefeeddata = $this->web_model->get_user_share_post($feeduserid,$feedlist['id']);
				   $shareuserdata1 = $this->web_model->get_user_details($usersharefeeddata[0]['s_uid']);
                   $feedshareusertime = $this->web_model->get_feed_detailsby_id($usersharefeeddata[0]['s_fid']);
                   
				   if($checkhidepost['0']['pid'] != $feedlist['id']){
				   
               ?>
               <div id="postid_<?php echo $feedlist['id'] ?>" class="call" style="margin-top:20px;">
                  <div class="col-md-12 strw">
                       <div class="dropdown">
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal">
                        <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"></a>
                        <ul class="dropdown-menu">
                            <?php if($feeduserid != $user){?> 
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" onclick='hide_post_by_user(this.id)'>Hide</a> </li>
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" onclick='report_post_by_user(this.id)'>Report</a></li>
                           <?php } else {?> 
                          <li><a id="<?php echo $feedlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_post_by_user(this.id)'>Delete</a></li>
                             <?php } ?>
                        </ul>
                      </div>
                    
                  
                     <a href="<?php echo base_url() ?>user/<?php echo $userfeeddata[0]['username'] ?>">
                     <?php if($updateuserdata['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"   class="feeduserimg llp <?php if($userfeeddata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userfeeddata[0]['profile_img']?>"  class="feeduserimg llp <?php if($userfeeddata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } ?>
                     <h2> <?php echo $userfeeddata[0]['username'] ?> </h2>
                     </a>
                     <h3>
                            <?php

                                $postdate1 = $feedlist['create_date'];
                                
                                echo $this->web_model->facebook_time_ago($postdate1);
                                
								
                        		$filepath = base_url().'assets/site/images/post/'.$feedlist['contentimg'];
                        		$path_parts = pathinfo($filepath);
                        
                                $fileExtension = $path_parts['extension'];
                                
                                $youtubename = $this->web_model->convertYoutube($feedlist['content']);

		preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $feedlist['content'], $match);
		$youtube_id = $match[1];

    
                            ?>
                    </h3>
                    
                    <?php if($usersharefeeddata[0]['insert_pid'] == $feedlist['id'] ){ ?>
                    
                    <div class="shareusersec">
                     <a href="<?php echo base_url() ?>user/<?php echo $shareuserdata1[0]['username'] ?>">   
                    <?php if($shareuserdata1['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png" class="feeduserimg llp <?php if($shareuserdata1[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $shareuserdata1[0]['profile_img']?>" class="feeduserimg llp <?php if($shareuserdata1[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>">
                     <?php } ?>
                    <h2>
                        <?php  echo $shareuserdata1[0]['username'];  ?>
                    <br>
                       <span> <?php 
                                $postdate11 = $feedshareusertime[0]['create_date'];
                                
                                echo $this->web_model->facebook_time_ago($postdate11);
                                
								?>
								</span>
                    </h2>
                    </a>
                    </div>
                    <?php } ?>
                    
                    <p>
                        <?php 
						//echo $this->plain_url_to_link($feedlist['content']);
						echo $feedlist['content'];
						?>
                    </p>
                     
                     
                    
                  </div>
                  <div class="duty">
                    <?php 
                     if(strpos($youtubename, 'youtube') > 0) { $youtubename; ?>
							
							<div class="youtube" data-embed="<?php echo $youtube_id ?>">
								<div class="play-button"></div>
							</div>
							
					 <?php } 
                        if($feedlist['type'] =='Twitch'){ $twichimgclass = 'style="display:none;"'; ?>
						
                          <iframe    src="https://player.twitch.tv/?video=<?php echo $feedlist['contentimg'];?>&autoplay=false" height="315" width="100%" allowfullscreen="true"> </iframe>
                         <?php 
                               
                           } 
                   
                     
                     if($feedlist['contentimg'] !=''){  
                     
                    
                     
                     if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                  
                  <video controls style="width: 100%;">
                        <source src="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" type="video/mp4">
                </video>
                
               
                  <?php } else { 
				  
				  $post_gallery = $this->web_model->get_post_gallerty_bypid($feedlist['id']);
				  
				  
				  if(count($post_gallery)>0){
					  ?>
					  <div class="gallery">
						<div class="grid-sizer"></div>
						<?php
						$i=1;
					  foreach($post_gallery as $pglist){
						  if(count($post_gallery)==1){
							  ?>
							  <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
               
				</a>
								  
	<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
	<script>
	$(document).ready(function(){
		$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
			type: 'image',
		  mainClass: 'mfp-with-zoom', 
		  gallery:{
					enabled:true
				},

		  zoom: {
			enabled: true, 

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			opener: function(openerElement) {

			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
		}

		});

	});
	</script>	
				<?php
						  }
						  else{
				  ?>
				  
				   
					<div class="item">
					 <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" >
						<img src="<?php echo base_url();?>assets/site/images/post-gallery/<?php echo $pglist['image'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
					</a>
					</div>
						  
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>				  
		
                  
						  <?php 
						  
						  } $i++;} 
						  
						  echo '</div>'; 
						  
						  } else {
							  if($feedlist['contentimg'] !='logo.svg'){
							  ?>
						  
					  <a class="image-popup-vertical-fit<?php echo $feedlist["id"];?>" href="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/post/<?php echo $feedlist['contentimg'];?>" class="feedimagesingle " <?php echo $twichimgclass ?>>
               
				</a>
					
	<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
	<script>
	$(document).ready(function(){
		$('.image-popup-vertical-fit<?php echo $feedlist["id"];?>').magnificPopup({
			type: 'image',
		  mainClass: 'mfp-with-zoom', 
		  gallery:{
					enabled:true
				},

		  zoom: {
			enabled: true, 

			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out', // CSS transition easing function

			opener: function(openerElement) {

			  return openerElement.is('img') ? openerElement : openerElement.find('img');
		  }
		}

		});

	});
	</script>
				<?php  
				  }  } } }  ?>
                  
                  
                  <textarea style="display:none;" id="feedcontent<?php echo $feedlist['id'] ?>"><?php echo $feedlist['content'];?></textarea>
                  
                  <input type="hidden" value="<?php echo $feedlist['contentimg'];?>" id="feedimage<?php echo $feedlist['id'] ?>">
                  
                     <div class="row like oldbox" style="margin: 0; padding:0;">
                    
                         
                        <div class="col-md-4 col-xs-4 repall " style="border-radius:0px;"> 
                            <a style="display:inline-block" data-toggle="modal" data-target="#guest_login_modal" id="<?php echo $feedlist['id'] ?>" class="button-style postlike checklike0<?php echo $feedlist['id'] ?> <?php if($alluserpostlikedata[0]['status'] ==1) { echo 'checklike1'; }  ?>" href="javascript:void(0)">+Rep | 
							<span id="postlikecount<?php echo $feedlist['id'] ?>"><?php echo count($allpostlikedata)?></span></a> 
                        </div>
                        
                        <div class="col-md-4 col-xs-4 comm">
                           <button type="button" class="comdrop" data-toggle="collapse" data-target="#comment<?php echo $feedlist['id'] ?>">
                                <span><i class="far fa-comment"></i></span> <span id="totalcomment<?php echo $feedlist['id'] ?>"><?php echo count($countcommentdata);?> </span>
                            </button>
                          
                        </div>
                        <div class="col-md-4 col-xs-4 errow" style="border-radius:0px;">
                            
                            <div class="dropdown"> 
                           <a class="dropdown-toggle" href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal" > <span><i class="fa fa-share"></i></span></a>
                              <div class="dropdown-menu"> 
                              <a class="copy_text" id="<?php echo $feedlist['id'] ?>" data-toggle="tooltip" href="<?php echo base_url()?>feed-detail/<?php echo $feedlist['id'] ?>">Copy Link</a>
                              <?php if($user != $feedlist['uid'] ){?>
                              <a class="sharefeed" id="<?php echo $feedlist['id'] ?>" href="javascript:void(0);">Share</a> 
                              <?php } ?>
                              </div>
                              
                          
                        </div>
                     </div>
                  </div>
                  <div id="comment<?php echo $feedlist['id'] ?>" class="color_bg-graylight collapse togleid">
                  <!--<div class="olmesrt">
                    <div class="dropdown">
                      <button class="dropdown-toggle comdrop oldbox_text" type="button" data-toggle="dropdown"><i class="fa fa-plus"></i></button>
                      <ul class="dropdown-menu">
                        <li><a class="newcommentlist" id="<?php echo $feedlist['id'] ?>">Newest</a></li>
                        <li><a class="oldcommentlist" id="<?php echo $feedlist['id'] ?>">Oldest</a></li>
                       
                      </ul>
                </div>
                    </div>-->
				  <div class="compic">
                   
				   <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>"> 
				  <?php if($user_sess['profile_img']==0){?>
				  <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png" class="feeduserimg llp <?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
				  <?php } else {?>
				  <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>" class="feeduserimg llp <?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
				  <?php } ?>
				  </a>
                        <div class="topbor">
                           <form id="comment_form<?php echo $feedlist['id'] ?>" action="#" method="post" enctype="multipart/form-data">
                               <div class="upload_newvcf">
							  <input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox" id="commentbox<?php echo $feedlist['id'] ?>" name="commentbox" placeholder="What are your thoughts, samurai?..." autocomplete='off'>
							  <input type="hidden" id="postid<?php echo $feedlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							  <input type="hidden" id="postuid<?php echo $feedlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							  <input type="hidden" id="comment_uid<?php echo $feedlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
							  <input type="file" onclick='getimgpreview(<?php echo $feedlist['id'] ?>)' name="image_file" id="image_file<?php echo $feedlist['id'] ?>"  class="upload-filebtn bg_attach">
                              
							</div>
							  
                           </form>
						   
                        </div>
                        
                     </div>
					 <div class="col-lg-11 text-center feed_preview_file_div"  id="feed_preview_file_div<?php echo $feedlist['id'] ?>"><ul></ul></div>
                     <div id="commentlist<?php echo $feedlist['id'] ?>" class="likerepot">
                         <div id="ajaxcommentlist<?php echo $feedlist['id'] ?>" class="likereport2"></div>
                        <div id="commentlistdata<?php echo $feedlist['id'] ?>" class="likerepot2">
                           <p class="entertopost">Press Enter to Post</p>
						   <?php 
						    $feedlist['id'];
								$getcommentdata = $this->web_model->get_comment_bypid($feedlist['id']);
								$count_comment = 0;
								foreach($getcommentdata as $commntlist){
								    
    								$comntuid = $commntlist['comment_uid'];
    								$userdata = $this->web_model->get_user_details($comntuid);
    								$countcommentrepdata = $this->web_model->get_commentreply_bycid($commntlist['id']);
    								
								    $countcommentlikedata = $this->web_model->get_commentlikedata_bycid($commntlist['id']);
								    
								    $commentlikedata = $this->web_model->get_usercommentlikedata_byid($commntlist['id'],$user);
								    
    								$cpostdate1 = $commntlist['cdate'];
    								
    								$commentdate = $this->web_model->facebook_time_ago($cpostdate1);
    								
                            $filepath = base_url().'assets/site/images/comment/'.$commntlist['contentimg'];
                        	$path_parts = pathinfo($filepath);
                        
                        $fileExtension = $path_parts['extension'];
                        
                        $youtubename = $this->web_model->convertYoutube($commntlist['comment']);


				   $checkhidecomment = $this->web_model->check_hidecommentby_userid_cid($commntlist['id'],$user);
    			
    			    if($checkhidecomment[0]['cid'] !=$commntlist['id']){
    			        if($count_comment < 5){
						   ?>
						   
						  <div class="col-md-12 commentlist<?php echo $commntlist['id'] ?> comment-section-list"> 
						 
                          
                          <div class="commentbox123">
                              <a href="<?php echo base_url() ?>user/<?php echo $userdata['0']['username'] ?>"> 
        						  <?php if($userdata['0']['profile_img'] == 0){ ?>
        						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;" >
        						   <?php } else { ?>
                                   <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userdata['0']['profile_img'] ?>"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
        						   <?php } ?>
                                   <h2><span style="color: #05c605;"><?php echo $userdata['0']['username'] ?></span></h2>
                                   </a>
                                   <a href="javascript:void(0)" class="commentdatebox"><?php echo $commentdate ?></a>
                                   <div class="dropdown kgiu">
                               
                               <div class="dropdown">
                                <a class="btn dropdown-toggle" data-toggle="modal" data-target="#guest_login_modal" type="button" data-toggle="dropdown">
                                    <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                <ul class="dropdown-menu">
                                     <?php if($userdata['0']['id']!= $user){ ?>
                                  <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcomment_by_user(this.id)'>Hide</a>   </li>
                                 <li>  <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='report_postcomment_by_user(this.id)'>Report</a>
                                 <input type="hidden" id="rcommentid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                 </li>
                                 
                                              <?php } else { ?>
                                              
                                           <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcomment_by_user(this.id)'>Delete</a>
                                           <input type="hidden" id="postid-<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>"></li>
                                              <?php } ?>
                                </ul>
                              </div>
                              
                                  </div>
                           </div>
                           
						  
                           
                           <h3 style="  word-break: break-word;"><?php echo $commntlist['comment'] ?></h3>
                             <p><?php  if(strpos($youtubename, 'youtube') > 0) { echo $youtubename; } ?></p>
                          
                          <div class="duty col-md-offset-2 ">
                              <?php if($commntlist['attach_img'] !='0'){  ?>
                          
                         
                          
                          <?php if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                          
                          <video controls style="width: 100%;">
                                <source src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['comment'];?>" type="video/mp4">
                        </video>
                        
                          <?php } else { ?>
                          
						  <a class="image-popup-vertical-fit<?php echo $commntlist["id"];?>" href="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" style="
    border-radius: 0;    width: 180px;    margin-left: -15px;    margin-top: 5px;    margin-bottom: 5px;">
                         
						</a>
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $commntlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>
						 <?php } } ?>
                          </div>
                           <div id="menu-outer">
                              <div class="table">
                               
                                 <ul id="horizontal-list2">
                                    <!--<li><a href="javascript:void(0)">rep | <span id="totalcommentreply<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?></span></a></li>-->
                                    <li><a href="javascript:void(0)" data-toggle="modal" data-target="#guest_login_modal" id="<?php echo $commntlist['id'] ?>" class="totalcommentlike <?php if($commentlikedata[0]['status'] == '1') { echo 'commentreplike'; } ?>">+rep | <span id="totalcommentcidlike<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentlikedata) ?></span></a></li>
                                  
                                    <li><a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">reply</a></li>
                                    
                                    <li><a style="color: #3aa6ff;" id="<?php echo $commntlist['id'] ?>" class="comment-replybox replybox_new" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreplist<?php echo $commntlist['id'] ?>" aria-expanded="false">
                                        <?php if(count($countcommentrepdata) > 0){ ?>
                                        View <span id="totalcommentreply-cid<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?> </span> Reply <?php } ?></a></li>
                                    
                                 </ul>
                              </div>
							  <div id="commentreply<?php echo $commntlist['id'] ?>" class="collapse firstcomment_new" aria-expanded="false">
								<div class="col-md-2"></div>
								<div class="col-md-10">
								    <form id="comment_repform<?php echo $commntlist['id'] ?>" action="#" method="post" class="attachmentbox">
								        <p style="margin: 0;    padding-left: 40px;    padding-bottom: 5px;">Replying to <a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">X</a></p>
								      
								      <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>">   
									<?php if($user_sess['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } ?>
            						   </a>
            						   
									<input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox repcom comment-reply" id="commentreplybox<?php echo $commntlist['id'] ?>" name="commentreplybox" placeholder="<?php echo $userdata['0']['username'] ?>" value="<?php echo $userdata['0']['username'] ?> "><br><br><br><br>
									<input type="hidden" id="commentid<?php echo $commntlist['id'] ?>" name="commentid" value="<?php echo $commntlist['id'] ?>">
									<input type="hidden" id="postid<?php echo $commntlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							        <input type="hidden" id="postuid<?php echo $commntlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							        <input type="hidden" id="postcuid<?php echo $commntlist['id'] ?>" value="<?php echo $userdata['0']['id'] ?>" name="postcuid">
							        <input type="hidden" id="commentpostuid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['comment_uid'] ?>" name="commentpostuid">
							        <input type="hidden" id="comment_uid<?php echo $commntlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
                                     <span class="ink_utf">
							<img src="<?php echo base_url();?>assets/site/images/attachment1.png" style="  width:20px;">
							<input type="file" class="upload-filebtn" name="image_file" id="image_file"></i></span>
							        
							        </form>
							     
								</div>
							  </div>
							       <div class="repylistlimit<?php echo $commntlist['id'] ?>" style="display:none;">
							           </div>
							       <div id="commentreplist<?php echo $commntlist['id'] ?>" class="commentreplist_new collapse" aria-expanded="false"> 
								    <?php 
								        $countcr = 0;
								        foreach($countcommentrepdata as $crlist){
								            
								            $cruserdata = $this->web_model->get_user_details($crlist['comment_uid']);
								            $crpostdate1 = $crlist['cdate'];
								            
    								        $commentreplydate = $this->web_model->facebook_time_ago($crpostdate1);
    								
								    if($countcr < 5){
								    ?>
								    
								<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?>">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					<?php } else { ?>
            					
            					<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?> morereply<?php echo $commntlist['id'] ?>" style="display:none;">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					
                              <?php } $countcr++; } ?>
                              	<?php if($countcr > 5){ ?>
						    	<p class="viewcommentrep startcommentrep" id="<?php echo $commntlist['id'] ?>">View <?php echo $countcr-5; ?> replies <span class="">5 Of <?php echo $countcr ?></span></p>
						    	<!--<p class="viewcommentrep endcommentrep" id="<?php echo $commntlist['id'] ?>" style="display:none">View 0 replies <span class=""><?php echo $countcr ?> Of 0 </span></p>-->
                           <?php } ?>
                           
                              </div>
							
                           </div>
						   </div>
						   
                           <?php } else {?>
                           
                          
                            <div class="col-md-12 gg commentlist<?php echo $commntlist['id'] ?> comment-section-list morecomment<?php echo $feedlist['id'] ?>" style="display:none;"> 
						 
                          
                          <div class="commentbox123">
                              <a href="<?php echo base_url() ?>user/<?php echo $userdata['0']['username'] ?>"> 
						  <?php if($userdata['0']['profile_img'] == 0){ ?>
						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;" >
						   <?php } else { ?>
                           <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $userdata['0']['profile_img'] ?>"  class="<?php if($userdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 40px;">
						   <?php } ?>
                           <h2><span style="color: #05c605;"><?php echo $userdata['0']['username'] ?></span></h2>
                           </a>
                           <a href="javascript:void(0)" class="commentdatebox"><?php echo $commentdate ?></a>
                           <div class="dropdown kgiu">
                       
                       <div class="dropdown">
                        <a data-toggle="modal" data-target="#guest_login_modal"  class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                            <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                        <ul class="dropdown-menu">
                             <?php if($userdata['0']['id']!= $user){ ?>
                          <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcomment_by_user(this.id)'>Hide</a>   </li>
                         <li>  <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" onclick='report_postcomment_by_user(this.id)'>Report</a>
                         <input type="hidden" id="rcommentid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                         </li>
                         
                                      <?php } else { ?>
                                      
                                   <li> <a id="<?php echo $commntlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcomment_by_user(this.id)'>Delete</a>
                                   <input type="hidden" id="postid-<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['id'] ?>"></li>
                                      <?php } ?>
                        </ul>
                      </div>
                      
                          </div>
                           </div>
                           
						  
                           
                           <h3 style="  word-break: break-word;"><?php echo $commntlist['comment'] ?></h3>
                             <p><?php  if(strpos($youtubename, 'youtube') > 0) { echo $youtubename; } ?></p>
                          
                          <div class="duty col-md-offset-2 ">
                              <?php if($commntlist['attach_img'] !='0'){  ?>
                          
                         
                          
                          <?php if($fileExtension == 'avi' || $fileExtension == 'flv' || $fileExtension == 'wmv' || $fileExtension == 'mp4' || $fileExtension == 'avi' || $fileExtension == 'mov') { ?>
                          
                          <video controls style="width: 100%;">
                                <source src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['comment'];?>" type="video/mp4">
                        </video>
                        
                          <?php } else { ?>
                          
						  <a class="image-popup-vertical-fit<?php echo $commntlist["id"];?>" href="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" >
					<img src="<?php echo base_url();?>assets/site/images/comment/<?php echo $commntlist['attach_img'];?>" style="
    border-radius: 0;    width: 180px;    margin-left: -15px;    margin-top: 5px;    margin-bottom: 5px;">
                          </a>
						  
							
		<script src='<?php echo base_url() ?>assets/site/js/jquery.magnific-popup.min.js'></script>
		<script>
		$(document).ready(function(){
			$('.image-popup-vertical-fit<?php echo $commntlist["id"];?>').magnificPopup({
				type: 'image',
			  mainClass: 'mfp-with-zoom', 
			  gallery:{
						enabled:true
					},

			  zoom: {
				enabled: true, 

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {

				  return openerElement.is('img') ? openerElement : openerElement.find('img');
			  }
			}

			});

		});
		</script>

						  <?php } } ?>
                          </div>
                           <div id="menu-outer">
                              <div class="table">
                               
                                 <ul id="horizontal-list2">
                                    <!--<li><a href="javascript:void(0)">rep | <span id="totalcommentreply<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?></span></a></li>-->
                                    <li><a href="javascript:void(0)" id="<?php echo $commntlist['id'] ?>" class="totalcommentlike <?php if($commentlikedata[0]['status'] == '1') { echo 'commentreplike'; } ?>">+rep | <span id="totalcommentcidlike<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentlikedata) ?></span></a></li>
                                  
                                    <li><a id="<?php echo $commntlist['id'] ?>" class="comment-replybox commentreplist_box" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreply<?php echo $commntlist['id'] ?>" aria-expanded="false">reply</a></li>
                                    
                                    <li><a style="color: #3aa6ff;" id="<?php echo $commntlist['id'] ?>" class="comment-replybox replybox_new" href="javascript:void(0)" data-toggle="collapse" data-target="#commentreplist<?php echo $commntlist['id'] ?>" aria-expanded="false">View 
                                    <span id="totalcommentreply-cid<?php echo $commntlist['id'] ?>"> <?php echo count($countcommentrepdata) ?> </span> Reply</a></li>
                                    
                                 </ul>
                              </div>
							  <div id="commentreply<?php echo $commntlist['id'] ?>" class="collapse firstcomment_new" aria-expanded="false">
								<div class="col-md-2"></div>
								<div class="col-md-10">
								    <form id="comment_repform<?php echo $commntlist['id'] ?>" action="#" method="post" class="attachmentbox">
								        <p style="margin: 0;    padding-left: 40px;    padding-bottom: 5px;">Replying to <?php echo $userdata['0']['username'] ?></p>
								      
								      <a href="<?php echo base_url() ?>user/<?php echo $user_sess['username'] ?>">   
									<?php if($user_sess['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $user_sess['profile_img']?>"  class="<?php if($user_sess['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;">
            						   <?php } ?>
            						   </a>
            						   
									<input type="text" data-toggle="modal" data-target="#guest_login_modal" class="commentbox repcom comment-reply" id="commentreplybox<?php echo $commntlist['id'] ?>" name="commentreplybox" placeholder="<?php echo $userdata['0']['username'] ?>" value="<?php echo $userdata['0']['username'] ?>"><br><br><br><br>
									<input type="hidden" id="commentid<?php echo $commntlist['id'] ?>" name="commentid" value="<?php echo $commntlist['id'] ?>">
									<input type="hidden" id="postid<?php echo $commntlist['id'] ?>" value="<?php echo $feedlist['id'] ?>" name="postid">
							        <input type="hidden" id="postuid<?php echo $commntlist['id'] ?>" value="<?php echo $feeduserid ?>" name="postuid">
							        <input type="hidden" id="postcuid<?php echo $commntlist['id'] ?>" value="<?php echo $userdata['0']['id'] ?>" name="postcuid">
							        <input type="hidden" id="commentpostuid<?php echo $commntlist['id'] ?>" value="<?php echo $commntlist['comment_uid'] ?>" name="commentpostuid">
							        <input type="hidden" id="comment_uid<?php echo $commntlist['id'] ?>" value="<?php echo $user_sess['id'] ?>" name="comment_uid">
                                     <span class="ink_utf">
							<img src="<?php echo base_url();?>assets/site/images/attachment1.png" style="  width:20px;">
							<input type="file" class="upload-filebtn" name="image_file" id="image_file"></i></span>
							        
							        </form>
							     
								</div>
							  </div>
							       
							       <div id="commentreplist<?php echo $commntlist['id'] ?>" class="commentreplist_new collapse" aria-expanded="false"> 
								    <?php 
								        
								        $countcr=0;
								        foreach($countcommentrepdata as $crlist){
								            
								            $cruserdata = $this->web_model->get_user_details($crlist['comment_uid']);
								            $crpostdate1 = $crlist['cdate'];
								            
    								        $commentreplydate = $this->web_model->facebook_time_ago($crpostdate1);
    								
								  if($countcr < 5){
								    ?>
								    
								<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?>">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a class="btn dropdown-toggle" data-toggle="modal" data-target="#guest_login_modal" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					<?php } else { ?>
            					
            					<div class="col-md-10 col-md-offset-2 commentreplist<?php echo $crlist['id'] ?> morereply<?php echo $commntlist['id'] ?>" style="display:none;">
                                <div class="commentbox123">
                                     <a href="<?php echo base_url() ?>user/<?php echo $cruserdata['0']['username'] ?>"> 
                                 <?php if($cruserdata['0']['profile_img'] == 0){ ?>
            						   <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" class="border_new">
            						   <?php } else { ?>
                                       <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $cruserdata['0']['profile_img']?>"  class="<?php if($cruserdata[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width: 25px;" >
            						   <?php } ?>
                                       <h2><span style="color: #05c605;"><?php echo $cruserdata['0']['username'] ?></span></h2>
                                    </a>
                                       <a href="javascript:void(0)"><?php echo $commentreplydate ?></a>
                                       
                                        <div class="dropdown">
                                            <a data-toggle="modal" data-target="#guest_login_modal" class="btn dropdown-toggle" type="button" data-toggle="dropdown">
                                                <img src="<?php echo base_url();?>assets/site/images/dot.png" class="dots"> </a>
                                            <ul class="dropdown-menu">
                                                 <?php if($user_sess['id'] != $crlist['comment_uid']){ ?>
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='hide_postcommentrep_by_user(this.id)'>Hide</a>   </li>
                                             <li>  <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" onclick='report_postcommentrep_by_user(this.id)'>Report</a>
                                             <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                             <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                             </li>
                                             
                                            <?php } else { ?>
                                                          
                                              <li> <a id="<?php echo $crlist['id'] ?>" href="javascript:void(0)" class="remove_feed" onclick='remove_postcommentrep_by_user(this.id)'>Delete</a>
                                                       <input type="hidden" id="commentrepid<?php echo $crlist['id'] ?>" value="<?php echo $crlist['id'] ?>">
                                                       <input type="hidden" id="commentid<?php echo $crlist['id'] ?>" value="<?php echo $commntlist['id'] ?>">
                                                       </li>
                                            <?php } ?>
                                            </ul>
                                      </div>
                                      
                                       
                                       </div>
                                       <h3 style="  word-break: break-word;"><?php echo $crlist['comment'] ?></h3>
            					</div>
            					
                                      <?php } $countcr++; } ?>
                                      	<?php if($countcr > 5){ ?>
        						    	<p class="viewcommentrep startcommentrep" id="<?php echo $commntlist['id'] ?>">View <?php echo $countcr-5; ?> replies <span class="">5 Of <?php echo $countcr ?></span></p>
						    <!--	<p class="viewcommentrep endcommentrep" id="<?php echo $commntlist['id'] ?>" style="display:none">View 0 replies <span class=""><?php echo $countcr ?> Of 0 </span></p>-->
                                   <?php } ?>
                           
                              </div>
							
                           </div>
						   </div>
                           
                           <?php } ?>
							<?php } $count_comment++; } ?>
							<?php if($count_comment > 5){ ?>
							<p class="viewcomment startcomment" id="<?php echo $feedlist['id'] ?>">View <?php echo $count_comment-5; ?> Comments <span class="">5 Of <?php echo $count_comment ?></span></p>
							<!--<p class="viewcomment endcomment" id="<?php echo $feedlist['id'] ?>" style="display:none;">View 0 Comment <span class=""><?php echo $count_comment ?> Of 0</span></p>-->
                           <?php } ?>
                        </div>
                     </div>
				  </div>
                 
               </div>
               </div>
               <?php } } }  
               else {
                   //echo '<div class="no-feed-list"><img src="'.base_url().'assets/site/images/svg/no_feed_icon.png"></div>';
               }
							 
 ?>
								
							 
							 
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
							<br>
						</div>
						</div>
					</div>
				</div>
				<div class="col-md-3 hidden-xs hidden-sm" style="padding:0px;" id="sidebar">
					<div class="two2">
						<div class="col-md-12 kizas" style="padding-left:0px;">
							<div class="postbut lockerpost none-create">
								<a href="#">
									<button type="button" style="  font-size: 16px;    color: #2699F0;    margin: 0px 0 10px 0;    font-weight: 900;    background: #181818;    border: 3px solid #2699F0;    border-radius: 5px;    width: 100%;    padding: 8px 0px;        display: flex;    align-items: center;    justify-content: center; ">CREATE POST
										<img src="https://digimonk.co/tynelzweb/assets/site/images/locker_create_post.png" class="createpostimg">
									</button>
								</a>
							</div>
							<div class="chi222">
								<div class="write2">
									<p>Trending</p>
								</div>
								<ul class="trending-divm" id="style-4">
                      <?php 
                      $uuid = $updateuserdata['id'];
                      
                      $subscribecommunitydetail = $this->db->query("SELECT *,  COUNT(*) as total FROM tynelz_subscriber_list where status=1    GROUP BY `s_uid`  ORDER BY COUNT(*) DESC limit 5")->result_array();
                    //print_r($subscribecommunitydetail);
                    if(count($subscribecommunitydetail) > 0){
                    foreach($subscribecommunitydetail as $sublist){
                        
                        $checksubscribe = $this->web_model->check_subscribe_user($updateuserdata['id'],$sublist['s_uid']);
                		$substatus = $checksubscribe['0']['status'];
                		
                        $suserdetail = $this->web_model->get_user_details($sublist['s_uid']);
                        $usercommunity = $this->web_model->get_community_detail($sublist['s_uid']);
                        
                       $checksubcribestatus = $this->web_model->get_subscribe_byuid($sublist['s_uid'],$updateuserdata['id']);
                        $checkstatus = $checksubcribestatus['0']['status'];
                        //function call
                            $num1 = $sublist['total'];
                            $ext1="";
                            $number_of_digits = $this->web_model->count_digit($num1); 
                                if($number_of_digits>3)
                            {
                                if($number_of_digits%2!=0)
                                  {  $divider=$this->web_model->divider($number_of_digits-1); }
                                else
                                   { $divider=$this->web_model->divider($number_of_digits); }
                            }
                            else{
                                $divider=1;
                            
                            $fraction=$num1/$divider;
                            $fraction=number_format($fraction);
                            if($number_of_digits==4 ||$number_of_digits==5)
                                {  $ext1="k";}
                            if($number_of_digits==6 ||$number_of_digits==7)
                                {    $ext1="M";}
                            
                            $maxpp = $fraction;
                            }
?>
                     <li > 
                     <a href="<?php echo base_url() ?>user/<?php echo $suserdetail['0']['username'] ?>">     
                     <?php
                     
                         if($suserdetail[0]['profile_img'] =='0'){?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/placeholder-user.png"  class="<?php if($suserdetail[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width:50px;">
                     <?php } else {?>
                     <img src="<?php echo base_url();?>assets/site/images/usersimage/<?php echo $suserdetail[0]['profile_img']?>"  class="<?php if($suserdetail[0]['checkonline']=='1'){echo 'online-user';} else { echo 'offline-user';} ?>" style="width:50px;">
                     <?php } ?>
                     
                        <h4><?php echo $suserdetail[0]['username']; ?></h4>
                    </a>
                       <span id="countsub_<?php echo $suserdetail[0]['id']; ?>"><?php echo $maxpp ?></span><span> members</span>
                        
                       <span id="subscribediv<?php echo $suserdetail[0]['id'] ?>">
                          
                           <a class="button-style ssubs2 <?php if(count($checksubcribestatus) != 0){ if($checkstatus == 1){ echo 'subsborder'; }}	?>" id="<?php echo $suserdetail[0]['id']; ?>"  onclick="add_getsubscribeuid(this)" href="javascript:void(0)">
                               <input type="hidden" id="gamecate<?php echo $suserdetail[0]['id']; ?>" name="gamecate" value="<?php echo $suserdetail[0]['gamecate']; ?>">
                               <input type="hidden" id="s_uname<?php echo $suserdetail[0]['id']; ?>" name="s_uname" value="<?php echo $suserdetail[0]['username']; ?>">
<?php if($checkstatus == 1){ ?>
                      <span id="subid_<?php echo $suserdetail[0]['id']; ?>">Subscribed </span>
<?php } else { ?>
					 <span id="subid_<?php echo $suserdetail[0]['id']; ?>">Subscribe </span>
<?php } ?>				 
                               
                               </a> 
                        </span>
                        
                     </li>
                     <?php } } else { echo '<p>No Community Available ! </p>'; } ?>
                    
                  </ul>
							</div>
							<div class="about">
								<ul class="hhw">
									<li><a href="https://digimonk.co/tynelzweb/content-policy" target="_blank">Content Policy </a>
									</li>
									<li>|</li>
									<li><a href="https://digimonk.co/tynelzweb/privacy-policy" target="_blank">Privacy Policy</a>
									</li>
								</ul>
								<p>© 2020 Tynelz, Inc. All rights reserved</p>
							</div>
						</div>
					</div>
				</div>
				<div class="back"> <a class="button-style" href="">Back to top</a> 
				</div>
			</div>
			
	<!--------------------guest Login----------------------->
	<div class="modal fade tw-popup" id="guest_login_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				 
				<div class="modal-body">
					<div class="logfo">
						<div class="lo">
							<div class="lo12si">
								<div id="grad1">
									<!--<ul class="signlog">
                        <li> <a class="active" href="<?php echo base_url();?>index">Log In</a></li>
                        <li> <a class="first" href="<?php echo base_url();?>signup">Sign Up</a></li>
                     </ul>-->Log in</div>
							</div>
						</div>
						<div class="fullform">
							<div class="col">
								<div class="hide-md-lg">
									<p>Or sign in manually:</p>
								</div>
								<div id="alert-msg1"></div>
								<?php $htmlBody; ?>
								<form id="loginsubmit_from" action="#" method="post">
									<!--<label for="email">E-mail</label>-->
									<div class="form-group loginicon">
										<input type="email" class="form-control" name="email" value="<?php if (get_cookie('uemail')) { echo get_cookie('uemail'); } ?>" id="loginemail1" placeholder="Enter your email " style="width: 100%;" required autocomplete="off">
										<!--<label for="password">Password</label>--> <span class="icon_key"></span>
									</div>
									<div class="form-group loginicon">
										<input type="password" class="form-control" value="<?php if (get_cookie('upassword')) { echo get_cookie('upassword'); } ?>" name="password" id="loginpassword1" placeholder="Enter your password" style="width: 100%;" required> <span class="icon_key" style="top:13px;"></span>
									</div>
									<label class="fgt_pwd container-sanjeev">
										<input type="checkbox" name="chkremember" value="Remember me" <?php if (get_cookie( 'uemail') && get_cookie( 'upassword')) { ?>checked="checked"
										<?php } ?>> <span class="checkmark2"></span>Remember me</label>
									<label class="jin"><a style="color:#f09a26;" href="javascript:void(0);" id="fpasswordmodel">Forgot password?</a>
									</label>
									<button type="submit" id="logsubmit1" name="loginSubmit" class="btn btn-primary btn-sm lonly">Log In</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!------------------guest login ends----------------------->
	<div class="bottom-modal">
		<div class="container">
			<div class="col-md-6 col-md-offset-3">
				<div class="row">
					<div class="col-md-5">
						<button type="submit" id="logsubmit1" name="loginSubmit" class="btn btn-primary btn-sm lonly" data-toggle="modal" data-target="#guest_login_modal">Log In</button>
					</div>
					<div class="col-md-2 text-center">| OR |</div>
					<div class="col-md-5">
						<button type="submit" id="logsubmit1" name="loginSubmit" class="btn btn-primary btn-sm lonly">Sign Up</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



<script src="<?php echo base_url() ?>assets/site/js/masonry.pkgd.min.js"></script>
<script src="<?php echo base_url() ?>assets/site/js/jquery.imagesloaded.min.js"></script>

<script>
 

$( function() {

  var $container = $('.gallery');

  $container.imagesLoaded( function() {
    $container.masonry({
      itemSelector: '.item',
      columnWidth: '.grid-sizer',
      gutter: 10
    });
  });
  
});

( function() {

	var youtube = document.querySelectorAll( ".youtube" );
	
	for (var i = 0; i < youtube.length; i++) {
		
		var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";
		
		var image = new Image();
				image.src = source;
				image.style="width: 100%;"
				image.addEventListener( "load", function() {
					youtube[ i ].appendChild( image );
				}( i ) );
		
				youtube[i].addEventListener( "click", function() {

					var iframe = document.createElement( "iframe" );

							iframe.setAttribute( "frameborder", "0" );
							iframe.setAttribute( "allowfullscreen", "" );
							iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

							this.innerHTML = "";
							this.appendChild( iframe );
				} );	
	};
	
} )();
     

</script>
  

<style>



button.player-button.player-button-play.js-control-play-button {
    width: 37px !important;
    margin-left: -2em !important;
    margin-top: -6em !important;
}
        @-webkit-keyframes placeHolderShimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        @keyframes placeHolderShimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
.strw h2 {
    padding: 0;
    color: #fff;
    margin: 0;
    font-weight: normal;
    display: inline-table;
}
        .content-placeholder1 {
          display: inline-block;
          -webkit-animation-duration: 1s;
          animation-duration: 1s;
          -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
          -webkit-animation-name: placeHolderShimmer;
          animation-name: placeHolderShimmer;
          -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
          background: #f6f7f8;
          background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
          background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          -webkit-background-size: 800px 104px;
          background-size: 800px 104px;
          height: inherit;
          position: relative;
        }

.note-editor.note-frame.panel.panel-default {
    background: transparent !important;
    border: 0 !important;
}
.note-editor.note-frame .note-editing-area .note-editable {
    background-color: transparent !important;
}
.note-editor.note-frame .note-statusbar .note-resizebar {
    width: 100% !important;
    height: 0px !important;
    padding-top: 0px !important;
    cursor: ns-resize !important;
    background: transparent !important;
    border: 0 !important;
}
.note-editor.note-frame .note-statusbar .note-resizebar .note-icon-bar {
    width: 20px !important;
    margin: 0px auto !important;
    border-top: 0px solid #a9a9a9 !important;
}
.note-editor.note-frame .note-statusbar {
    background-color: #f5f5f5 !important;
    border-top: 0px solid #ddd !important;
    border-bottom-right-radius: 4px !important;
    border-bottom-left-radius: 4px !important;
}
img.att-post {
    width: 15px;
    background: transparent;
}
.full .col-md-1 {
    background: transparent;
}
.note-editor.note-frame.panel.panel-default {
    background: #141414 !important;
    border: none;
}
span.ink_utf.uplo_buttun-comment span.fileinput-name {
    top: 45px !important;
    width: 30em !important;
}
span.fileinput-name {
    right: -47px !important;
}
</style>


     <script>
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>