import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import TodoService from '../service';
import '../styles/Data.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Data() {
  //Δύο καταστάσεις (states) χρησιμοποιώντας τη συνάρτηση useState. Οι μεταβλητές completedData και notCompletedData αρχικοποιούνται με ένα κενό πίνακα.
  const [completedData, setCompletedData] = useState([]);
  const [notCompletedData, setNotCompletedData] = useState([]);
  
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
  labels: ['Completed', 'Not Completed'],
  datasets: [
    {
      label: ['Sum'],
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

// Bar Chart
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Data for completed + not todos
const barChartData = {
  labels,
  datasets: [
    {
      label: 'Completed',
      data: [30, 40, 13, 7, 40, 5, 6], // Replace with your actual data
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Not Completed',
      data: [10, 30, 5, 6, 30, 10, 6], // Replace with your actual data
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
