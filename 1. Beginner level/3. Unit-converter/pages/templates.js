function layout(title, activeNav, content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unit Converter</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f0f2f5;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
      padding: 2rem;
      width: 100%;
      max-width: 480px;
    }

    .card h1 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #111;
      margin-bottom: 1.2rem;
    }

    /* tab nav */
    .tabs {
      display: flex;
      gap: 1.5rem;
      border-bottom: 2px solid #eee;
      margin-bottom: 1.8rem;
    }

    .tabs a {
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      color: #888;
      padding-bottom: 0.6rem;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
    }

    .tabs a.active {
      color: #3b82f6;
      border-bottom: 2px solid #3b82f6;
    }

    .tabs a:hover:not(.active) {
      color: #555;
    }

    /* form */
    .form-group {
      margin-bottom: 1.1rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.4rem;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.65rem 0.8rem;
      border: 1.5px solid #ddd;
      border-radius: 6px;
      font-size: 0.95rem;
      color: #111;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: #3b82f6;
    }

    .btn {
      display: inline-block;
      padding: 0.65rem 1.4rem;
      border: 1.5px solid #111;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      background: white;
      color: #111;
      margin-top: 0.5rem;
      transition: background 0.15s, color 0.15s;
    }

    .btn:hover {
      background: #111;
      color: white;
    }

    .btn-primary {
      background: #111;
      color: white;
    }

    .btn-primary:hover {
      background: #333;
    }

    /* result */
    .result-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #555;
      margin-bottom: 0.5rem;
    }

    .result-value {
      font-size: 2rem;
      font-weight: 800;
      color: #111;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Unit Converter</h1>
    <nav class="tabs">
      <a href="/length" ${activeNav === 'length' ? 'class="active"' : ''}>Length</a>
      <a href="/weight" ${activeNav === 'weight' ? 'class="active"' : ''}>Weight</a>
      <a href="/temperature" ${activeNav === 'temperature' ? 'class="active"' : ''}>Temperature</a>
    </nav>
    ${content}
  </div>
</body>
</html>`;
}

function formContent(action, label, units, result, fromVal, toVal, inputVal) {
  const isDropdown = Array.isArray(units);
  const options = isDropdown
    ? units.map(u => `<option value="${u}" ${u === fromVal ? 'selected' : ''}>${u.charAt(0).toUpperCase() + u.slice(1)}</option>`).join('')
    : '';
  const optionsTo = isDropdown
    ? units.map(u => `<option value="${u}" ${u === toVal ? 'selected' : ''}>${u.charAt(0).toUpperCase() + u.slice(1)}</option>`).join('')
    : '';

  if (result) {
    return `
      <p class="result-label">Result of your calculation</p>
      <p class="result-value">${result}</p>
      <a href="${action}" class="btn">Reset</a>
    `;
  }

  return `
    <form method="POST" action="${action}">
      <div class="form-group">
        <label>Enter the ${label} to convert</label>
        <input type="number" name="value" step="any" placeholder="e.g. 20" value="${inputVal || ''}" required />
      </div>
      <div class="form-group">
        <label>Unit to Convert from</label>
        <select name="from">${options}</select>
      </div>
      <div class="form-group">
        <label>Unit to Convert to</label>
        <select name="to">${optionsTo}</select>
      </div>
      <button type="submit" class="btn btn-primary">Convert</button>
    </form>
  `;
}

function lengthForm(result = null, fromVal, toVal, inputVal) {
  const units = ['millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile'];
  return layout('Length', 'length', formContent('/length', 'length', units, result, fromVal, toVal, inputVal));
}

function weightForm(result = null, fromVal, toVal, inputVal) {
  const units = ['milligram', 'gram', 'kilogram', 'ounce', 'pound'];
  return layout('Weight', 'weight', formContent('/weight', 'weight', units, result, fromVal, toVal, inputVal));
}

function temperatureForm(result = null, fromVal, toVal, inputVal) {
  const units = ['celsius', 'fahrenheit', 'kelvin'];
  return layout('Temperature', 'temperature', formContent('/temperature', 'temperature', units, result, fromVal, toVal, inputVal));
}

module.exports = { lengthForm, weightForm, temperatureForm };