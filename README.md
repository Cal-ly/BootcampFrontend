# **BootcampFrontend**
Bootcamp frontend repo divided into two parts. The folder `opgave8` builds on `opgave7`. It is meant as a showcase rather than a real project. However both `opgave7` and `opgave8` are workable using e.g. Live Server extension in VSCode.

## **Structure**
This is set-up as the simplest Vue application as possible. There is no build proces, which one should be mindfull of, if one wants to deploy to **Azure**, which will try to build the project.

Also there is two `index.html` files in each folder, which also will hamper the proces of deploying.

### **Opgave 7**
This Vue.js application manages a list of coffee beans. It interacts with a backend API to fetch, add, update, and delete coffee bean records. The main functionalities are as follows:

1. Data Properties:
   - `coffeeBeans`: An array to store coffee beans fetched from the API.
   - `form`: An object to hold form data for adding or updating a coffee bean.
   - `isEdit`: A boolean flag to determine if the form is in edit mode.
   - `apiBase`: The base URL for the coffee bean API.

2. Methods:
   - `fetchCoffeeBeans`: An asynchronous method that fetches all coffee beans from the API and stores them in the `coffeeBeans` array.
   - `submitForm`: An asynchronous method that either adds a new coffee bean or updates an existing one based on the `isEdit` flag. It sends a POST request to add a new bean or a PUT request to update an existing bean. After submission, it resets the form.
   - `editBean`: Populates the form with the data of the coffee bean to be edited and sets the `isEdit` flag to true.
   - `deleteBean`: An asynchronous method that deletes a coffee bean by its ID. It sends a DELETE request to the API and then fetches the updated list of coffee beans.
   - `resetForm`: Resets the form to its initial state and sets the `isEdit` flag to false.

3. Lifecycle Hook:
   - `mounted`: A lifecycle hook that is called when the Vue instance is mounted. It fetches the coffee beans from the API when the application is initialized.

4. HTML Integration:
   - The `index.html` file includes a table to display the list of coffee beans and a form to add or edit a coffee bean.
   - The table uses `v-for` to iterate over `coffeeBeans` and display each bean's details.
   - The form uses `v-model` to bind input fields to the `form` object properties and a `@submit.prevent` directive to handle form submission without reloading the page.
   - Buttons in the table allow editing and deleting coffee beans, with corresponding methods to be implemented in the Vue instance.

Overall, this component provides a complete CRUD interface for managing coffee beans, leveraging Vue.js for reactive data binding and Axios for HTTP requests.

#### **Note**
There is a folder in `opgave7` called `alternative`, which contains `alt_script.js` and `forklaring.md`. The script contains a similar solution as `script.js` but uses `.then/.catch`, rather than `async/await` and `try-catch` blocks. The markdown file `forklaring.md` contains a conceptual explanation on the differences between the two. When opening the repo in VSCode, then right-click the .md-file and choose Open Preview in order to view the markdown file parsed.

### **Opgave 8**
This build on `opgave7` and adds the feature to filter and sort the table.
The `filteredAndSortedBeans` computed property is used to filter and sort the coffee beans based on user input.

1. Filtering: If `filterText` is not empty, it converts the filter text to lowercase and filters the `coffeeBeans` 
array to include only those beans whose `beanType` (converted to lowercase) includes the filter text.

2. Sorting: The filtered beans are then sorted by the `roasting` property. If `sortOrder` is "asc", 
the beans are sorted in ascending order; otherwise, they are sorted in descending order.

The resulting array of beans is returned and used in the template to display the filtered and sorted list of coffee beans.
