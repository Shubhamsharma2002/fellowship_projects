document.addEventListener("DOMContentLoaded", () => {
  let userIp = "";
  let postOfficesData = [];

  const landingPage = document.getElementById("landing-page");
  const mainPage = document.getElementById("main-page");
  const getStartedBtn = document.getElementById("get-started-btn");
  const userIpLanding = document.getElementById("user-ip-landing");
  const searchInput = document.getElementById("search-input");

  // Step 1: Get User's IP Address on page load
  fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => {
      userIp = data.ip;
      userIpLanding.textContent = userIp;
    })
    .catch((err) => {
      console.error("Error fetching IP address:", err);
      userIpLanding.textContent = "Unable to fetch IP";
    });

  // Step 2: Fetch detailed user info when button is clicked
  getStartedBtn.addEventListener("click", () => {
    if (!userIp) {
      alert("IP address is not available yet. Please wait.");
      return;
    }

    landingPage.classList.add("hidden");
    mainPage.classList.remove("hidden");

    fetchIpDetails(userIp);
  });

  // Step 3: Fetch Location Details using ipinfo.io
  function fetchIpDetails(ip) {
    // Free tier token endpoint
    fetch(`https://ipinfo.io/${ip}/geo`)
      .then((res) => res.json())
      .then((data) => {
        // ipinfo.io returns "loc" as "latitude,longitude"
        let lat = "", lon = "";
        if (data.loc) {
          [lat, lon] = data.loc.split(",");
        }

        populateHeaderInfo(data, lat, lon);
        renderMap(lat, lon);
        renderTimezoneInfo(data.timezone);

        const pincode = data.postal || data.zip;
        if (pincode) {
          fetchPostOffices(pincode);
        } else {
          document.getElementById("post-office-count").textContent =
            "Pincode not available";
        }
      })
      .catch((err) => {
        console.error("Error fetching IP details:", err);
      });
  }

  function populateHeaderInfo(data, lat, lon) {
    document.getElementById("user-ip").textContent = data.ip || userIp;
    document.getElementById("lat").textContent = lat || "N/A";
    document.getElementById("long").textContent = lon || "N/A";
    document.getElementById("city").textContent = data.city || "N/A";
    document.getElementById("region").textContent = data.region || "N/A";
    document.getElementById("org").textContent = data.org || "N/A";
    document.getElementById("hostname").textContent = data.hostname || "N/A";
    document.getElementById("timezone").textContent = data.timezone || "N/A";
    document.getElementById("pincode").textContent = data.postal || "N/A";
  }

  // Step 4: Embed Google Map using lat and lon
  function renderMap(lat, lon) {
    const iframe = document.getElementById("map-iframe");
    if (lat && lon) {
      iframe.src = `https://maps.google.com/maps?q=${lat},${lon}&z=13&output=embed`;
    }
  }

  // Step 5: Format Date & Time for Timezone
  function renderTimezoneInfo(timezone) {
    const now = new Date();
    if (timezone) {
      try {
        const formattedTime = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          dateStyle: "full",
          timeStyle: "medium",
        }).format(now);

        document.getElementById("datetime").textContent = formattedTime;
        return;
      } catch (e) {
        console.error("Invalid timezone string:", e);
      }
    }
    document.getElementById("datetime").textContent = now.toLocaleString();
  }

  // Step 6: Fetch Post Offices by Pincode
  function fetchPostOffices(pincode) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => res.json())
      .then((data) => {
        const result = data[0];
        document.getElementById("post-office-count").textContent =
          `Message: ${result.Message}`;

        if (result.Status === "Success" && result.PostOffice) {
          postOfficesData = result.PostOffice;
          renderPostOffices(postOfficesData);
        } else {
          document.getElementById("post-office-grid").innerHTML =
            "<p>No post offices found for this pincode.</p>";
        }
      })
      .catch((err) => {
        console.error("Error fetching post office details:", err);
        document.getElementById("post-office-count").textContent =
          "Error retrieving post offices";
      });
  }

  // Step 7: Render Post Offices into Grid
  function renderPostOffices(list) {
    const grid = document.getElementById("post-office-grid");
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = "<p>No matching post offices found.</p>";
      return;
    }

    list.forEach((po) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <p><strong>Name:</strong> ${po.Name}</p>
        <p><strong>Branch Type:</strong> ${po.BranchType}</p>
        <p><strong>Delivery Status:</strong> ${po.DeliveryStatus}</p>
        <p><strong>District:</strong> ${po.District}</p>
        <p><strong>Division:</strong> ${po.Division}</p>
      `;
      grid.appendChild(card);
    });
  }

  // Step 8: Search Filter
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = postOfficesData.filter(
      (po) =>
        po.Name.toLowerCase().includes(query) ||
        po.BranchType.toLowerCase().includes(query)
    );
    renderPostOffices(filtered);
  });
});