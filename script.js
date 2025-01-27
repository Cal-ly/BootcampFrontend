// Import the createApp function from Vue
const { createApp } = Vue;

// Create a new Vue application
createApp({
  // Define the data properties for the application
  data() {
    return {
      // Array to store coffee beans fetched from the API
      coffeeBeans: [],
      // Form data for adding or updating a coffee bean
      form: {
        id: 0,
        name: "",
        beanType: "",
        roasting: null,
        price: null,
      },
      // Flag to determine if the form is in edit mode
      isEdit: false,
      // Base URL for the coffee bean API
      apiBase: "https://coffeebeanapi-e0gma8fpcwa6hvdv.westeurope-01.azurewebsites.net/coffeebean",
    };
  },
  // Define the methods for the application
  methods: {
    // Fetch all coffee beans from the API
    async fetchCoffeeBeans() {
      try {
        // Make a GET request to the API to fetch coffee beans
        const response = await axios.get(this.apiBase);
        // Store the fetched coffee beans in the coffeeBeans array
        this.coffeeBeans = response.data;
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching coffee beans:", error.response?.data || error.message);
      }
    },
    // Add or update a coffee bean using the form data
    async submitForm() {
      try {
        if (this.isEdit) {
          // If in edit mode, update the existing coffee bean
          await axios.put(`${this.apiBase}/${this.form.id}`, this.form);
        } else {
          // If not in edit mode, add a new coffee bean
          await axios.post(this.apiBase, this.form);
        }
        // Reset the form after submission
        this.resetForm();
        // Fetch the updated list of coffee beans
        this.fetchCoffeeBeans();
      } catch (error) {
        // Log any errors that occur during form submission
        console.error("Error submitting form:", error.response?.data || error.message);
      }
    },
    // Edit a coffee bean by populating the form with the bean's data
    editBean(bean) {
      // Copy the bean's data into the form
      this.form = { ...bean };
      // Set the form to edit mode
      this.isEdit = true;
    },
    // Delete a coffee bean
    async deleteBean(id) {
      try {
        await axios.delete(`${this.apiBase}/${id}`);
        this.fetchCoffeeBeans();
      } catch (error) {
        console.error("Error deleting coffee bean:", error.response?.data || error.message);
      }
    },
    // Reset the form to its initial state
    resetForm() {
      this.form = {
        id: 0,
        name: "",
        beanType: "",
        roasting: null,
        price: null,
      };
      this.isEdit = false;
    },
  },
  // Fetch coffee beans when the application is mounted
  mounted() {
    this.fetchCoffeeBeans();
  },
}).mount('#app'); // Mount the Vue application to the DOM element with the id 'app'