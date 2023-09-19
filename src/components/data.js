import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import '../styles/Data.scss';
import TodoService from '../service'; 
import { useState, useEffect } from 'react';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Bar Chart
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Data for completed todos
const completedData = {
  label: 'Completed',
  data: [30, 40, 13, 7, 40, 5, 6], // Replace with your actual data
  backgroundColor: 'rgba(75, 192, 192, 0.5)',
};

// Data for not completed todos
const notCompletedData = {
  label: 'Not Completed',
  data: [0, 30, 5, 6, 30, 0, 6], // Replace with your actual data
  backgroundColor: 'rgba(255, 99, 132, 0.5)',
};

const barChartData = {
  labels,
  datasets: [completedData, notCompletedData],
};

function Data() {
  //Δύο καταστάσεις (states) χρησιμοποιώντας τη συνάρτηση useState. Οι μεταβλητές completedData και notCompletedData αρχικοποιούνται με ένα κενό πίνακα.
  const [completedData, setCompletedData] = useState([]);
  const [notCompletedData, setNotCompletedData] = useState([]);
  //Μια μεταβλητή labels που περιέχει έναν πίνακα με ένα κενό στοιχείο.
  const labels = [''];
  //Λήψη δεδομένων από το service.
  useEffect(() => {
    //Γίνεται μια ασύγχρονη (async) κλήση στην υπηρεσία TodoService.getTodo με τη χρήση της await.
    const fetchData = async () => {
      try {
        const response = await TodoService.getTodo({
          pageRequestDto: {
            pageNo: 0,
            pageSize: 0,
            sort: [],
          },
        });
        //Ανάλογα με το αποτέλεσμα της κλήσης...
        if (response.status === 200) {
          //Αν η κλήση επιστρέψει κωδικό κατάστασης 200 (επιτυχία), τότε να.. 
          const json = await response.json();
          console.log('All the list from db:', json);
          //Αποθηκεύονται στις μεταβλητές completedData και notCompletedData
          const completedCounts = json.content.filter((todo) => todo.completed).length;
          const notCompletedCounts = json.content.filter((todo) => !todo.completed).length;
          setCompletedData([completedCounts]);
          setNotCompletedData([notCompletedCounts]);
        } //Αν υπάρξει οποιοδήποτε σφάλμα κατά τη διάρκεια της κλήσης, τότε εκτυπώνονται αντίστοιχα μηνύματα σφάλματος στην κονσόλα.
          else if (response.status === 400) {
          console.error('Bad Request');
        } else if (response.status === 401) {
          console.error('Unauthorized');
        } else if (response.status === 500) {
          console.error('Internal Server Error');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

// PieChart
const pieChartData = {
  datasets: [
    {
      labels,
      data: [completedData,notCompletedData],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

//Options Pie and BarChart

//Mια μεταβλητή που περιέχει τις επιλογές και τις ρυθμίσεις για το γράφημα μπάρας.
const pieChartOptions = {
  //Tο γράφημα θα προσαρμόζεται στο μέγεθος του παραθύρου του προγράμματος περιήγησης.
  responsive: true,
  //Tα plugins που θα χρησιμοποιηθούν για το γράφημα.
  plugins: {
    //Oρίζει τη θέση του υπομνήματος (λεζάντας) στο γράφημα. 
    legend: {
      position: 'bottom',
    },
    //Eμφανίζει έναν τίτλο για το γράφημα
    title: {
      display: true,
      text: 'Pie Chart',
      fontSize: 16,
    },   
  },
}

//Mια μεταβλητή που περιέχει τις επιλογές και τις ρυθμίσεις για το γράφημα μπάρας.
const barChartOptions = {
  //Tο γράφημα θα προσαρμόζεται στο μέγεθος του παραθύρου του προγράμματος περιήγησης.
  responsive: true,
  //Tα plugins που θα χρησιμοποιηθούν για το γράφημα
  plugins: {
    //Oρίζει τη θέση του υπομνήματος (λεζάντας) στο γράφημα. 
    legend: {
      position: 'bottom',
    },
    //Eμφανίζει έναν τίτλο για το γράφημα
    title: {
      display: true,
      text: 'Bar Chart',
      fontSize: 16,
    },
  },
};

  return (
    <div className="chart-container">
      <div className="chart">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
      <div className="chart">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
}

export default Data;
