// // Import web3 library
// const Web3 = require('web3');

// // Create a new web3 instance connected to the BSC network
// const web3 = new Web3('testnet.bscscan.com');

// // Contract address of the OuchCoin contract on BSC
// const contractAddress = '0x8018BF94666793a40E39d9fc65b717cCc4E6326e';

// // ABI (Application Binary Interface) of the OuchCoin contract
// const abi = [
//     // Add the ABI of the OuchCoin contract here
// ];

// // Create a contract instance
// const contract = new web3.eth.Contract(abi, contractAddress);

// // Fetch contract details
// async function fetchContractDetails() {
//     try {
//         // Get total coins burned
//         const totalCoinsBurned = await contract.methods.totalCoinsBurned().call();
//         document.getElementById('burnedSupply').textContent = totalCoinsBurned;
//     } catch (error) {
//         console.error('Error fetching contract details:', error);
//     }
// }

// // Call the function to fetch contract details
// fetchContractDetails();

// Show scroll to top button when scrolling down
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

// Smooth scrolling to top when button is clicked
function scrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const scrollDuration = 400; // Duration of the scroll animation in milliseconds

    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Contract address
var qr = new QRious({
    element: document.getElementById('qrcode'),
    value: '0x5B427Dbf83041BD006C40E4C34C7b196d8B3947F', // URL or text you want to encode
    size: 200 // Size of the QR code in pixels
});

// Airdrop account
var qr2 = new QRious({
    element: document.getElementById('qrcode2'),
    value: '0x1266f7fc797d60C9BEE4537106D4675aE8eb6325', // URL or text you want to encode
    size: 200 // Size of the QR code in pixels
});

var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIOS) {
    var video = document.getElementById('background-video');
    var isPlaying = false;

    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY + window.innerHeight;
        var elementOffset = video.offsetTop + video.clientHeight / 2;

        if (scrollPosition > elementOffset && !isPlaying) {
            video.play();
            isPlaying = true;
        }
    });
}

const contractAddress = '0x5B427Dbf83041BD006C40E4C34C7b196d8B3947F';
const initialMint = 420690000000000; // Initial mint supply (in wei)

// Fetch total supply
fetch(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}`)
    .then(response => response.json())
    .then(data => {
        const totalSupply = data.result;

        // Calculate total coins burned
        const totalCoinsBurned = initialMint - totalSupply;

        // Format numbers into currency format
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
        });

        document.getElementById('totalSupply').innerText = formatter.format(totalSupply);
        document.getElementById('totalCoinsBurned').innerText = formatter.format(totalCoinsBurned);
    })
    .catch(error => console.error('Error fetching total supply:', error));
