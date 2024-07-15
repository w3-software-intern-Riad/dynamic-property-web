document.addEventListener("DOMContentLoaded", () => {
    const h3 = document.getElementById("cursor-pointer-clickable");
    const toggleDiv = document.getElementById("toggle-header-div");
    const searchDestination = document.getElementById(
        "clickable-search-destination"
    );
    const searchDestinationDiv = document.querySelector(".search-destination");

    const overlayDiv = document.querySelector(".overlay-country-div");
    const check_in = document.querySelector(".check-in");
    const check_out = document.querySelector(".check-out");
    const add_guest_div = document.querySelector(".add-guest");
    const mobileShareBtn = document.querySelector(".share")
    const shareButton = document.querySelector("#shareButton");
    shareButton.addEventListener("click", () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    })

    mobileShareBtn.addEventListener("click", () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    })
    let cnName;


    const search_destination_btn = document.getElementById("clickable-search-icon");
    console.log(search_destination_btn)

    search_destination_btn.addEventListener("click", () => {
        console.log("search icon is clicked")
        overlay_add_guest.style.display = "none";
        const country = cnName;
        const check_in_date_data = checkIn_date;
        const check_out_date_data = checkOut_date;
        const guest_number = adult_people_number + child_number + infant_number + pet_number;
        const user_data = {
            country: country,
            ccheck_in_date_data: check_in_date_data,
            check_out_date_data: check_out_date_data,
            guest_number: guest_number
        }
        console.log("user data:", user_data);
        const data = JSON.stringify(user_data);
        localStorage.setItem('bookingData', data);
        alert('Data saved successfully!', user_data);
    })


    h3.addEventListener("click", () => {

        if (toggleDiv.style.display === "none" || toggleDiv.style.display === "") {
            toggleDiv.style.display = "flex";
            toggleDiv.style.animation = "fadeIn 1.5s forwards";
            toggleDiv.style.opacity = "1";
        } else {
            toggleDiv.style.animation = "fadeOut 1.5s forwards";
            toggleDiv.style.opacity = "0";
            setTimeout(() => {
                toggleDiv.style.display = "none";
                overlayDiv.style.display = "none";
            }, 1000); // Adjusted to match the animation duration
        }
    });
    const mobileMenu = document.querySelector(".overlay-country-div-mobile");
    searchDestination.addEventListener("click", () => {
        if (
            overlayDiv.style.display === "none" ||
            overlayDiv.style.display === ""


        ) {

            overlayDiv.style.display = "flex";
            searchDestinationDiv.style.backgroundColor = "white";
            // searchDestinationDiv.style.width = '100%';
            searchDestinationDiv.style.borderRadius = "50px";
        } else {

            overlayDiv.style.display = "none";
            searchDestinationDiv.style.backgroundColor = ""; // Reset background color
            searchDestinationDiv.style.borderRadius = ""; // Reset border radius
        }
    });

    const country_name = document.querySelectorAll("#countryImages");

    country_name.forEach((img) => {
        img.addEventListener("click", () => {
            const countryName = img.getAttribute("data-value");
            cnName = countryName;

            document.getElementById("clickable-search-destination").innerHTML =
                countryName;

            overlayDiv.style.display = "none";
            searchDestinationDiv.style.backgroundColor = ""; // Reset background color
            searchDestinationDiv.style.borderRadius = "";
            check_in.style.backgroundColor = "white";
            check_in.style.borderRadius = "50px";
        });
    });

    const add_check_in_date = document.querySelector("#add-date-checkIn");
    const dateInput_checkIn = document.querySelector("#bulma-datepicker-2");
    const dateInput_checkOut = document.querySelector("#bulma-datepicker-3");
    let checkIn_date;
    let checkOut_date;
    add_check_in_date.addEventListener("click", () => {
        check_out.style.backgroundColor = "white";
        check_out.style.borderRadius = "50px";
        check_in.style.backgroundColor = "";
        check_in.style.borderRadius = "";
        checkIn_date = dateInput_checkIn.value;
        console.log("check-in: ", checkIn_date);
    });

    const add_check_out_date = document.querySelector("#add-date-checkout");
    const overlay_add_guest = document.querySelector(".overlay-add-guest");
    add_check_out_date.addEventListener("click", () => {
        check_out.style.backgroundColor = "";
        check_out.style.borderRadius = "";
        add_guest_div.style.backgroundColor = "white";
        add_guest_div.style.borderRadius = "50px";
        overlay_add_guest.style.display = "flex";
        checkOut_date = dateInput_checkOut.value;
        console.log("check-out: ", checkOut_date);
    });

    const overlayContainer = document.querySelector(".overlay-container");
    const fullGallery = document.getElementById("fullGallery");
    const closeGallery = document.getElementById("closeGallery");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentIndex = 0;

    const allImages = document.querySelectorAll(
        ".gallerySection img#bedroomImages,.gallerySection img#bedroomImages1"
    );
    const fullGalleryImages = Array.from(allImages).map((img) =>
        img.cloneNode(true)
    );

    fullGalleryImages.forEach((img) => {
        fullGallery.insertBefore(
            img,
            fullGallery.querySelector(".navigation-buttons")
        );
    });

    function updateGalleryDisplay() {
        fullGalleryImages.forEach((img, index) => {
            img.style.display = index === currentIndex ? "block" : "none";
        });
    }

    prevButton.addEventListener("click", function () {
        currentIndex =
            (currentIndex - 1 + fullGalleryImages.length) % fullGalleryImages.length;
        updateGalleryDisplay();
    });

    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % fullGalleryImages.length;
        updateGalleryDisplay();
    });

    overlayContainer.addEventListener("click", function () {
        fullGallery.style.display = "flex";
        updateGalleryDisplay();
    });

    closeGallery.addEventListener("click", function () {
        fullGallery.style.display = "none";
    });

    updateGalleryDisplay();

    const saveButton = document.querySelector("#saveButton");
    const saveIcon = document.querySelector("#saveIcon");
    // Check local storage for button click state
    const isClicked = localStorage.getItem("saveButtonClicked");

    if (isClicked === "true") {
        saveIcon.style.color = "red";
    } else {
        saveIcon.style.color = "black";
    }

    // Add click event listener to the button
    saveButton.addEventListener("click", () => {
        if (saveIcon.style.color === "red") {
            saveIcon.style.color = "black";
            localStorage.setItem("saveButtonClicked", "false");
        } else {
            saveIcon.style.color = "red";
            localStorage.setItem("saveButtonClicked", "true");
        }
    });

    const mobileSaveBtn = document.querySelector(".favorite");
    const isClicked2 = localStorage.getItem("saveButtonClicked2");

    if (isClicked2 === "true") {
        mobileSaveBtn.style.backgroundColor = "red";
    } else {
        mobileSaveBtn.style.backgroundColor = "white";
    }
    mobileSaveBtn.addEventListener("click", () => {
        if (mobileSaveBtn.style.backgroundColor === "red") {
            mobileSaveBtn.style.backgroundColor = "white";
            localStorage.setItem("saveButtonClicked2", "false");
        } else {
            mobileSaveBtn.style.backgroundColor = "red";
            localStorage.setItem("saveButtonClicked2", "true");
        }
    });

    const showAllPhoto = document.querySelector("#show-all-photos");
    showAllPhoto.addEventListener("click", () => {
        console.log("showAllphotoClicked");
        fullGallery.style.display = "flex";
        updateGalleryDisplay();
    });

    const adult_sub_button = document.querySelector("#substract-icon-adult");
    const adult_add_button = document.querySelector("#add-icon-adult");
    const adult_counter = document.querySelector("#adult-people-number")
    let adult_people_number = 0;
    const add_guest_text = document.querySelector("#clickable-add-guest");

    adult_sub_button.addEventListener("click", () => {
        // console.log("button sub is clicked")
        if (adult_people_number > 0) {
            --adult_people_number;
            adult_counter.innerHTML = adult_people_number;
        }
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })
    adult_add_button.addEventListener("click", () => {
        ++adult_people_number;
        // console.log("button add is clicked")
        adult_counter.innerHTML = adult_people_number;
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })

    //child portion 

    const child_sub_button = document.querySelector("#substract-icon-children");
    const child_add_button = document.querySelector("#add-icon-children");
    const child_counter = document.querySelector("#children-number")
    let child_number = 0;
    child_sub_button.addEventListener("click", () => {
        // console.log("button sub is clicked")
        if (child_number > 0) {
            --child_number;
            child_counter.innerHTML = child_number;
        }
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })
    child_add_button.addEventListener("click", () => {
        ++child_number;
        // console.log("button add is clicked")
        child_counter.innerHTML = child_number;
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })



    //infants portion

    const infant_sub_button = document.querySelector("#substract-icon-infant");
    const infant_add_button = document.querySelector("#add-icon-infant");
    const infant_counter = document.querySelector("#infant-people-number")
    let infant_number = 0;
    infant_sub_button.addEventListener("click", () => {
        // console.log("button sub is clicked")
        if (infant_number > 0) {
            --infant_number;
            infant_counter.innerHTML = infant_number;
        }
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })
    infant_add_button.addEventListener("click", () => {
        ++infant_number;
        // console.log("button add is clicked")
        infant_counter.innerHTML = infant_number;
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })


    //pet portion
    const pet_sub_button = document.querySelector("#substract-icon-pet");
    const pet_add_button = document.querySelector("#add-icon-pet");
    const pet_counter = document.querySelector("#pet-counter")
    let pet_number = 0;
    pet_sub_button.addEventListener("click", () => {
        // console.log("button sub is clicked")
        if (pet_number > 0) {
            --pet_number;
            pet_counter.innerHTML = pet_number;
        }
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })
    pet_add_button.addEventListener("click", () => {
        ++pet_number;
        // console.log("button add is clicked")
        pet_counter.innerHTML = pet_number;
        add_guest_text.innerHTML = `${adult_people_number} adults, ${child_number} childs, ${infant_number} infants,${pet_number} pets`
    })

    bulmaCalendar.attach('#bulma-datepicker-2', {
        displayMode: 'dialog',
        startDate: new Date('02/11/2018'),
        minDate: '01/01/2018',
        maxDate: '12/31/2018',
        color: themeColors.primary,
        lang: 'en'
    });

    bulmaCalendar.attach('#bulma-datepicker-3', {
        displayMode: 'dialog',
        startDate: new Date('02/11/2018'),
        minDate: '01/01/2018',
        maxDate: '12/31/2018',
        color: themeColors.primary,
        lang: 'en'
    });



});