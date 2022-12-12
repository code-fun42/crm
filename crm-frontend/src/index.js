import { Crm } from "./components/crm/Crm.js";
import { FormAdd } from "./components/formAdd/FormAdd.js";
import { FormEdit } from "./components/formEdit/FormEdit.js";
import { Header } from "./components/header/Header.js";
import { TableClients } from "./components/tableClients/TableClients.js";

const crm = new Crm("#app", {
  components: [Header, TableClients, FormEdit, FormAdd],
});

crm.render();
