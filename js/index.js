console.log("Contacts");
let contacts = [];

      const searchInput = document.getElementById("searchInput");
      const contactForm = document.getElementById("contactForm");
      const nameInput = document.getElementById("nameInput");
      const emailInput = document.getElementById("emailInput");
      const phoneInput = document.getElementById("phoneInput");
      const addContactBtn = document.getElementById("addContactBtn");
      const updateContactBtn = document.getElementById("updateContactBtn");
      const cancelUpdateBtn = document.getElementById("cancelUpdateBtn");
      const showFormBtn = document.getElementById("showFormBtn");
      const contactList = document.getElementById("contactList");

      function renderContacts() {
        contactList.innerHTML = "";
        contacts.forEach((contact, index) => {
          const li = document.createElement("li");
          li.className = "py-4";
          li.innerHTML = `
            <h2 class="text-lg font-semibold">${contact.name}</h2>
            <p class="text-gray-500">${contact.email}</p>
            <p class="text-gray-500">${contact.phone}</p>
            <div class="mt-2">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2" onclick="editContact(${index})">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded-md" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
          contactList.appendChild(li);
        });
      }

      function toggleFormVisibility() {
        contactForm.classList.toggle("hidden");
      }

      function resetForm() {
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
      }

      function addContact() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        if (name && email && phone) {
          const newContact = { id: Date.now(), name, email, phone };
          contacts.push(newContact);
          renderContacts();
          resetForm();
          toggleFormVisibility();
        } else {
          alert("Please fill out all fields.");
        }
      }

      function editContact(index) {
        const contact = contacts[index];
        nameInput.value = contact.name;
        emailInput.value = contact.email;
        phoneInput.value = contact.phone;
        toggleFormVisibility();
        addContactBtn.classList.add("hidden");
        updateContactBtn.classList.remove("hidden");
        cancelUpdateBtn.classList.remove("hidden");

        updateContactBtn.onclick = () => {
          const updatedName = nameInput.value.trim();
          const updatedEmail = emailInput.value.trim();
          const updatedPhone = phoneInput.value.trim();
          if (updatedName && updatedEmail && updatedPhone) {
            contacts[index] = {
              ...contact,
              name: updatedName,
              email: updatedEmail,
              phone: updatedPhone,
            };
            renderContacts();
            resetForm();
            toggleFormVisibility();
            addContactBtn.classList.remove("hidden");
            updateContactBtn.classList.add("hidden");
            cancelUpdateBtn.classList.add("hidden");
          } else {
            alert("Please fill out all fields.");
          }
        };

        cancelUpdateBtn.onclick = () => {
          resetForm();
          toggleFormVisibility();
          addContactBtn.classList.remove("hidden");
          updateContactBtn.classList.add("hidden");
          cancelUpdateBtn.classList.add("hidden");
        };
      }

      function deleteContact(index) {
        contacts.splice(index, 1);
        renderContacts();
      }

      showFormBtn.addEventListener("click", () => {
        resetForm();
        toggleFormVisibility();
        addContactBtn.classList.remove("hidden");
        updateContactBtn.classList.add("hidden");
        cancelUpdateBtn.classList.add("hidden");
      });

      addContactBtn.addEventListener("click", () => {
        addContact();
      });

      searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const filteredContacts = contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(searchText) ||
            contact.email.toLowerCase().includes(searchText) ||
            contact.phone.includes(searchText)
        );
        renderContacts(filteredContacts);
      });

      // Initial render
      renderContacts();