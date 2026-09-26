const defaultJobs=[
{id:1,company:"TechNova",title:"Associate Software Engineer",category:"Freshers",experience:"0-1 Years",qualification:"B.E / B.Tech / MCA",salary:"₹3 - ₹6 LPA",location:"Pune / Multiple Locations",skills:"Java, SQL, OOP, DSA",description:"Entry-level software engineering opportunity for candidates with strong programming fundamentals and willingness to learn.",details:"Eligibility: Engineering or MCA graduate. Skills: Java, SQL and basic DSA. Selection may include aptitude, technical and HR rounds.",applyUrl:"https://example.com/apply",logo:"",status:"Published",date:"2026-09-26",updated:"2026-09-26"},
{id:2,company:"DataCore",title:"SQL / Database Trainee",category:"SQL / Database",experience:"0 Years",qualification:"B.E / B.Tech / BCA / B.Sc",salary:"₹2.5 - ₹4 LPA",location:"Pune",skills:"SQL, MySQL, RDBMS, Excel",description:"Trainee opportunity focused on SQL querying, data validation, database support and troubleshooting.",details:"Good understanding of SQL queries and relational database concepts preferred.",applyUrl:"https://example.com/apply",logo:"",status:"Published",date:"2026-09-25",updated:"2026-09-25"},
{id:3,company:"QualityFirst",title:"Software Test Engineer",category:"Testing",experience:"0-1 Years",qualification:"Any Graduate / Engineering",salary:"₹3 - ₹5 LPA",location:"Pune / Hybrid",skills:"Manual Testing, SQL, SDLC, STLC",description:"Fresher testing role involving test case creation, defect reporting and basic database validation.",details:"Knowledge of SDLC, STLC, test cases and basic SQL is useful.",applyUrl:"https://example.com/apply",logo:"",status:"Published",date:"2026-09-24",updated:"2026-09-24"},
{id:4,company:"CloudWorks",title:"Java Developer Intern",category:"Internships",experience:"Students / Freshers",qualification:"B.E / B.Tech / MCA",salary:"Stipend",location:"Remote",skills:"Java, Spring Boot, Git",description:"Development internship for learners who want practical experience building Java applications.",details:"Interns work on Java application development and version control.",applyUrl:"https://example.com/apply",logo:"",status:"Published",date:"2026-09-23",updated:"2026-09-23"},
{id:5,company:"InnoSoft",title:"Junior Java Developer",category:"IT Jobs",experience:"0-1 Years",qualification:"B.E / B.Tech / MCA",salary:"₹3.5 - ₹7 LPA",location:"Bengaluru / Pune",skills:"Core Java, Collections, SQL",description:"Junior development position focused on application development, debugging and collaboration.",details:"Core Java and SQL fundamentals required. Spring knowledge is an advantage.",applyUrl:"https://example.com/apply",logo:"",status:"Published",date:"2026-09-22",updated:"2026-09-22"}
];

function getJobs(){let x=localStorage.getItem("hiretrack_jobs_v11");if(!x){saveJobs(defaultJobs);return defaultJobs}try{return JSON.parse(x)}catch{return defaultJobs}}
function saveJobs(j){localStorage.setItem("hiretrack_jobs_v11",JSON.stringify(j))}
function today(){return new Date().toISOString().slice(0,10)}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function safeUrl(url){try{let u=new URL(url||"#",location.href);return["http:","https:"].includes(u.protocol)?u.href:"#"}catch{return"#"}}

function renderPublicJobs(){
 const jobs=getJobs().filter(j=>j.status==="Published");
 const q=document.getElementById("searchInput").value.toLowerCase().trim(), cat=document.getElementById("categoryFilter").value;
 const filtered=jobs.filter(j=>{let t=`${j.company} ${j.title} ${j.skills} ${j.location} ${j.description}`.toLowerCase();return(!q||t.includes(q))&&(cat==="All"||j.category===cat)});
 document.getElementById("heroJobCount").textContent=jobs.length;
 document.getElementById("resultCount").textContent=`${filtered.length} job${filtered.length===1?"":"s"} found`;
 document.getElementById("jobGrid").innerHTML=filtered.map(j=>`
 <article class="job-card"><div class="company">${esc(j.company)}</div><h3>${esc(j.title)}</h3>
 <div class="meta"><span class="tag">${esc(j.category)}</span><span class="tag">${esc(j.experience)}</span></div>
 <p>${esc(j.description)}</p><div class="job-bottom"><span class="salary">${esc(j.salary||"Not disclosed")}</span>
 <button class="details-btn" onclick="openJob(${j.id})">View Details</button></div></article>`).join("");
 document.getElementById("emptyState").classList.toggle("hidden",filtered.length>0)
}
function openJob(id){
 const j=getJobs().find(x=>x.id===id);if(!j)return;
 document.getElementById("jobDetails").innerHTML=`
 <div class="detail-company">${esc(j.company)}</div><h2 class="detail-title">${esc(j.title)}</h2>
 <div class="detail-grid"><div class="detail-item"><small>Category</small><strong>${esc(j.category)}</strong></div>
 <div class="detail-item"><small>Experience</small><strong>${esc(j.experience)}</strong></div>
 <div class="detail-item"><small>Qualification</small><strong>${esc(j.qualification)}</strong></div>
 <div class="detail-item"><small>Salary</small><strong>${esc(j.salary||"Not disclosed")}</strong></div>
 <div class="detail-item"><small>Location</small><strong>${esc(j.location||"Not specified")}</strong></div>
 <div class="detail-item"><small>Skills</small><strong>${esc(j.skills||"Not specified")}</strong></div></div>
 <h3>Job Description</h3><p class="muted">${esc(j.description)}</p>
 ${j.details?`<h3 style="margin-top:18px">Eligibility & Details</h3><p class="muted">${esc(j.details).replace(/\n/g,"<br>")}</p>`:""}
 <a class="primary apply" href="${safeUrl(j.applyUrl)}" target="_blank" rel="noopener">Apply Now ↗</a>`;
 document.getElementById("jobModal").classList.remove("hidden")
}
function closeJobModal(){document.getElementById("jobModal").classList.add("hidden")}
function closeModalBackdrop(e,id){if(e.target.id===id)document.getElementById(id).classList.add("hidden")}
function filterCategory(c){document.getElementById("categoryFilter").value=c;document.getElementById("jobs").scrollIntoView({behavior:"smooth"});renderPublicJobs()}
function toggleMenu(){let n=document.getElementById("mainNav");n.style.display=n.style.display==="flex"?"none":"flex";n.style.flexDirection="column";n.style.position="absolute";n.style.top="72px";n.style.left="0";n.style.right="0";n.style.background="#fff";n.style.padding="18px 4%";n.style.borderBottom="1px solid #e2e8f0"}

/* Admin auth */
function openAdminLogin(){document.getElementById("loginModal").classList.remove("hidden");document.getElementById("adminUser").focus()}
function closeAdminLogin(){document.getElementById("loginModal").classList.add("hidden")}
document.getElementById("loginForm").addEventListener("submit",e=>{
 e.preventDefault();let u=document.getElementById("adminUser").value,p=document.getElementById("adminPass").value;
 if(u==="kartikb8308@gmail.com"&&p==="Kartik@1120#"){sessionStorage.setItem("hiretrack_admin","1");closeAdminLogin();openDashboard()}
 else alert("Invalid demo credentials.")
})
function openDashboard(){document.getElementById("adminPanel").classList.remove("hidden");renderAdminDashboard();showAdminView("dashboard")}
function logoutAdmin(){sessionStorage.removeItem("hiretrack_admin");document.getElementById("adminPanel").classList.add("hidden")}
function showAdminView(view,btn){
 document.querySelectorAll(".admin-view").forEach(x=>x.classList.add("hidden"));
 let el=document.getElementById("admin"+view.charAt(0).toUpperCase()+view.slice(1));if(el)el.classList.remove("hidden");
 document.querySelectorAll(".side-link").forEach(x=>x.classList.remove("active"));if(btn)btn.classList.add("active");
 if(view==="dashboard")renderAdminDashboard();if(view==="posts")renderAdminPosts();if(view==="newPost")resetEditorIfNeeded();
}
function toggleSidebar(){document.querySelector(".sidebar").classList.toggle("open")}

/* Admin dashboard */
function renderAdminDashboard(){
 const jobs=getJobs(),pub=jobs.filter(j=>j.status==="Published").length,draft=jobs.length-pub;
 document.getElementById("statTotal").textContent=jobs.length;document.getElementById("statPublished").textContent=pub;document.getElementById("statDrafts").textContent=draft;
 document.getElementById("recentPosts").innerHTML=jobs.slice(0,5).map(j=>`
 <div class="recent-row"><div class="logo-placeholder">${esc((j.company||"?")[0])}</div><div class="recent-info"><b>${esc(j.title)}</b><small>${esc(j.company)} • ${esc(j.category)}</small></div><span class="status ${j.status.toLowerCase()}">${j.status}</span></div>`).join("")
}
function renderAdminPosts(){
 const q=(document.getElementById("adminSearch")?.value||"").toLowerCase(),st=document.getElementById("adminStatus")?.value||"All";
 const jobs=getJobs().filter(j=>(st==="All"||j.status===st)&&(`${j.title} ${j.company} ${j.category}`.toLowerCase().includes(q)));
 document.getElementById("postTable").innerHTML=jobs.map(j=>`
 <tr><td><strong>${esc(j.title)}</strong><br><small>${esc(j.location||"")}</small></td><td>${esc(j.company)}</td><td>${esc(j.category)}</td>
 <td><span class="status ${j.status.toLowerCase()}">${j.status}</span></td><td>${esc(j.updated||j.date||"")}</td>
 <td><div class="table-actions"><button class="icon-btn" onclick="editPost(${j.id})">Edit</button>
 <button class="icon-btn" onclick="togglePublish(${j.id})">${j.status==="Published"?"Unpublish":"Publish"}</button>
 <button class="icon-btn delete" onclick="deletePost(${j.id})">Delete</button></div></td></tr>`).join("")
}
function editPost(id){
 const j=getJobs().find(x=>x.id===id);if(!j)return;
 document.getElementById("postId").value=j.id;document.getElementById("fCompany").value=j.company;document.getElementById("fTitle").value=j.title;
 document.getElementById("fCategory").value=j.category;document.getElementById("fExperience").value=j.experience;document.getElementById("fQualification").value=j.qualification;
 document.getElementById("fSalary").value=j.salary||"";document.getElementById("fLocation").value=j.location||"";document.getElementById("fApplyUrl").value=j.applyUrl||"";
 document.getElementById("fLogo").value=j.logo||"";document.getElementById("fDate").value=j.date||today();document.getElementById("fSkills").value=j.skills||"";
 document.getElementById("fDescription").value=j.description||"";document.getElementById("fDetails").value=j.details||"";
 document.getElementById("editorTitle").textContent="Edit Job Blog";showAdminView("newPost")
}
function resetEditorIfNeeded(){
 if(document.getElementById("postId").value)return;
 document.getElementById("postForm").reset();document.getElementById("fDate").value=today();document.getElementById("editorTitle").textContent="Add Job Blog"
}
function savePost(status){
 const required=["fCompany","fTitle","fCategory","fExperience","fQualification","fDescription"];
 if(required.some(id=>!document.getElementById(id).value.trim())){alert("Please fill all required (*) fields.");return}
 let jobs=getJobs(),id=Number(document.getElementById("postId").value);
 const post={id:id||Date.now(),company:v("fCompany"),title:v("fTitle"),category:v("fCategory"),experience:v("fExperience"),qualification:v("fQualification"),salary:v("fSalary"),location:v("fLocation"),applyUrl:v("fApplyUrl"),logo:v("fLogo"),date:v("fDate")||today(),skills:v("fSkills"),description:v("fDescription"),details:v("fDetails"),status,updated:today()};
 if(id)jobs=jobs.map(j=>j.id===id?post:j);else jobs.unshift(post);saveJobs(jobs);
 alert(status==="Published"?"Job blog published successfully.":"Job blog saved as draft.");
 document.getElementById("postId").value="";showAdminView("posts");renderPublicJobs()
}
function v(id){return document.getElementById(id).value.trim()}
function togglePublish(id){let jobs=getJobs();jobs=jobs.map(j=>j.id===id?{...j,status:j.status==="Published"?"Draft":"Published",updated:today()}:j);saveJobs(jobs);renderAdminPosts();renderAdminDashboard();renderPublicJobs()}
function deletePost(id){let j=getJobs().find(x=>x.id===id);if(!j)return;if(confirm(`Delete "${j.title}"?`)){saveJobs(getJobs().filter(x=>x.id!==id));renderAdminPosts();renderAdminDashboard();renderPublicJobs()}}
function resetDemo(){if(confirm("Reset all posts to the original demo data?")){saveJobs(defaultJobs);renderAdminDashboard();renderAdminPosts();renderPublicJobs();alert("Demo data reset.")}}

document.getElementById("year").textContent=new Date().getFullYear();renderPublicJobs();
