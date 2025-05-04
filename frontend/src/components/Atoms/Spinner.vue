<template>
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
</template>

<style>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 6px solid #e0e0e0;
  border-top: 6px solid #007BFF;
  border-radius: 50%;
  animation: spin 0.8s ease-in-out infinite;
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>