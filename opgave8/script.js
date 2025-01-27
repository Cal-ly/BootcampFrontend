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
      filterText: "", // For filtering by BeanType
      sortOrder: "asc", // For sorting by Roasting
      apiBase: "https://coffeebeanapi-e0gma8fpcwa6hvdv.westeurope-01.azurewebsites.net/coffeebean",
    };
  },
  computed: {
    // Filter and sort coffee beans
    filteredAndSortedBeans() {
      let beans = this.coffeeBeans;

      // Filter by BeanType (case-insensitive)
      if (this.filterText) {
        const lowerCaseFilter = this.filterText.toLowerCase();
        beans = beans.filter((bean) =>
          bean.beanType.toLowerCase().includes(lowerCaseFilter)
        );
      }

      // Sort by Roasting
      beans = beans.sort((a, b) =>
        this.sortOrder === "asc" ? a.roasting - b.roasting : b.roasting - a.roasting
      );

      return beans;
    },
  },
  methods: {
    // Fetch all coffee beans
    async fetchCoffeeBeans() {
      try {
        const response = await axios.get(this.apiBase);
        this.coffeeBeans = response.data;
      } catch (error) {
        console.error("Error fetching coffee beans:", error.response?.data || error.message);
      }
    },
    // Add or update a coffee bean
    async submitForm() {
      try {
        if (this.isEdit) {
          // Update existing coffee bean
          await axios.put(`${this.apiBase}/${this.form.id}`, this.form);
        } else {
          // Add a new coffee bean
          await axios.post(this.apiBase, this.form);
        }
        this.resetForm();
        this.fetchCoffeeBeans();
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
      }
    },
    // Edit a coffee bean
    editBean(bean) {
      this.form = { ...bean };
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
