// pricing_tool.js

function calculatePrice() {
    // Get user inputs
    const treads = parseInt(document.getElementById('treads').value);
    const treadMaterial = document.getElementById('treadMaterial').value;
    const finishOption = document.getElementById('finishOption').value;
    const stringerType = document.getElementById('stringerType').value;
    const railingOption = document.getElementById('railingOption').value;
    const stairWidth = parseFloat(document.getElementById('stairWidth').value);
    const installationComplexity = document.getElementById('installationComplexity').value;
    const ledLighting = document.getElementById('ledLighting').checked;
    const nonSlip = document.getElementById('nonSlip').checked;

    // Material Costs
    const treadMaterialCosts = {
        'oak': 150,
        'maple': 180,
        'walnut': 200
    };
    const finishOptionCosts = {
        'standard': 30,
        'premium': 50
    };
    const stringerCosts = {
        'standard': 3000,
        'heavyDuty': 4000
    };
    const railingCosts = {
        'cable': 200,
        'glass': 500
    };

    // Calculate Material Cost
    const costPerTread = treadMaterialCosts[treadMaterial] + finishOptionCosts[finishOption];
    const treadsCost = treads * costPerTread;
    const stringerCost = stringerCosts[stringerType];
    const railingLength = ((treads * 10) / 12) * stairWidth; // Assuming 10" run per tread
    const railingCost = railingLength * railingCosts[railingOption];

    const materialCost = treadsCost + stringerCost + railingCost;

    // Manufacturing Labor Cost
    let laborHours = 50; // Base labor hours
    if (installationComplexity === 'lShaped') {
        laborHours *= 1.2;
    } else if (installationComplexity === 'uShaped') {
        laborHours *= 1.3;
    }
    const laborRate = 50; // $50 per hour
    const laborCost = laborHours * laborRate;

    // Overhead Allocation
    const overheadPercentage = 0.3;
    const overheadAllocation = (materialCost + laborCost) * overheadPercentage;

    // Additional Features Cost
    let additionalFeaturesCost = 0;
    if (ledLighting) additionalFeaturesCost += 1000;
    if (nonSlip) additionalFeaturesCost += 500;

    // Installation Cost
    let installationLaborHours = 20; // Base installation hours
    if (installationComplexity === 'lShaped') {
        installationLaborHours *= 1.2;
    } else if (installationComplexity === 'uShaped') {
        installationLaborHours *= 1.3;
    }
    const installationLaborRate = 70; // $70 per hour
    const installationCost = installationLaborHours * installationLaborRate;

    // Shipping Cost (Simplified)
    const shippingCost = 700; // Flat rate for this example

    // Desired Profit
    const profitMargin = 0.2;
    const desiredProfit = (materialCost + laborCost + overheadAllocation) * profitMargin;

    // Final Price Calculation
    const finalPrice = materialCost + laborCost + overheadAllocation + additionalFeaturesCost + installationCost + shippingCost + desiredProfit;

    // Display Detailed Breakdown
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Total Price: $${finalPrice.toFixed(2)}</h2>
        <h3>Breakdown:</h3>
        <ul>
            <li>Material Cost: $${materialCost.toFixed(2)}</li>
            <li>Manufacturing Labor Cost: $${laborCost.toFixed(2)}</li>
            <li>Overhead Allocation: $${overheadAllocation.toFixed(2)}</li>
            <li>Additional Features Cost: $${additionalFeaturesCost.toFixed(2)}</li>
            <li>Installation Cost: $${installationCost.toFixed(2)}</li>
            <li>Shipping Cost: $${shippingCost.toFixed(2)}</li>
            <li>Desired Profit: $${desiredProfit.toFixed(2)}</li>
        </ul>
    `;
}