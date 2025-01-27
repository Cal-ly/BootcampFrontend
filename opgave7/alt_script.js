const { createApp } = Vue;

createApp({
  data() {
    return {
      coffeeBeans: [],
      form: {
        id: 0,
        name: "",
        beanType: "",
        roasting: null,
        price: null,
      },
      isEdit: false,
      apiBase: "https://coffeebeanapi-e0gma8fpcwa6hvdv.westeurope-01.azurewebsites.net/coffeebean",
    };
  },
  methods: {
    // Fetch all coffee beans
    fetchCoffeeBeans() {
      axios
        .get(this.apiBase)
        .then((response) => {
          this.coffeeBeans = response.data;
        })
        .catch((error) => {
          console.error("Error fetching coffee beans:", error.response?.data || error.message);
        })
        .finally(() => {
          console.log("Fetch coffee beans request completed.");
        });
    },
    // Add or update a coffee bean
    submitForm() {
      const url = this.isEdit ? `${this.apiBase}/${this.form.id}` : this.apiBase;
      const method = this.isEdit ? "put" : "post";

      axios[method](url, this.form)
        .then(() => {
          this.resetForm();
          this.fetchCoffeeBeans();
        })
        .catch((error) => {
          console.error("Error submitting form:", error.response?.data || error.message);
        })
        .finally(() => {
          console.log("Submit form request completed.");
        });
    },
    // Edit a coffee bean
    editBean(bean) {
      this.form = { ...bean };
      this.isEdit = true;
    },
    // Delete a coffee bean
    deleteBean(id) {
      axios
        .delete(`${this.apiBase}/${id}`)
        .then(() => {
          this.fetchCoffeeBeans();
        })
        .catch((error) => {
          console.error("Error deleting coffee bean:", error.response?.data || error.message);
        })
        .finally(() => {
          console.log("Delete bean request completed.");
        });
    },
    // Reset the form
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
  mounted() {
    this.fetchCoffeeBeans();
  },
}).mount("#app");
