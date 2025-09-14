const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
        const submitBtn = document.getElementById('submitBtn');
        const progressSection = document.getElementById('progressSection');
        const progressFill = document.querySelector('.progress-fill');
        const uploadPercent = document.getElementById('uploadPercent');
        const confirmation = document.getElementById('confirmation');
        const historyList = document.getElementById('historyList');
        const searchInput = document.getElementById('searchInput');
        const uploadTab = document.getElementById('uploadTab');
        const historyTab = document.getElementById('historyTab');
        const uploadSection = document.getElementById('uploadSection');
        const historySection = document.getElementById('historySection');

        let selectedFiles = [];
        let uploadHistory = JSON.parse(localStorage.getItem('uploadHistory')) || [];

        // Add mock data if empty
        if (uploadHistory.length === 0) {
            uploadHistory = [
                { name: 'X-ray_report.pdf', size: 2.5, date: new Date('2023-05-15').toISOString().split('T')[0], status: 'Uploaded' },
                { name: 'Blood_test.jpg', size: 1.8, date: new Date('2023-06-20').toISOString().split('T')[0], status: 'Uploaded' },
                { name: 'MRI_scan.png', size: 4.2, date: new Date('2023-07-10').toISOString().split('T')[0], status: 'Uploaded' }
            ];
            localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
        }

        function switchTab(tab) {
            if (tab === 'history') {
                uploadSection.style.display = 'none';
                historySection.style.display = 'block';
                uploadTab.classList.remove('bg-indigo-600');
                historyTab.classList.add('bg-indigo-600');
                renderHistory();
            } else {
                historySection.style.display = 'none';
                uploadSection.style.display = 'block';
                historyTab.classList.remove('bg-indigo-600');
                uploadTab.classList.add('bg-indigo-600');
            }
        }

        uploadTab.onclick = () => switchTab('upload');

        uploadZone.addEventListener('click', () => fileInput.click());
        uploadZone.addEventListener('dragover', handleDragOver);
        uploadZone.addEventListener('dragleave', handleDragLeave);
        uploadZone.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
        submitBtn.addEventListener('click', simulateUpload);

        function handleDragOver(e) {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        }

        function handleDragLeave(e) {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
        }

        function handleDrop(e) {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            addFiles(files);
        }

        function handleFileSelect(e) {
            const files = Array.from(e.target.files);
            addFiles(files);
        }

        function addFiles(files) {
            selectedFiles = [...selectedFiles, ...files];
            renderFileList();
            submitBtn.disabled = selectedFiles.length === 0;
        }

        function renderFileList() {
            fileList.innerHTML = '';
            selectedFiles.forEach((file, index) => {
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
                const isImage = file.type.startsWith('image/');

                const fileItem = document.createElement('div');
                fileItem.className = 'file-item fade-in';
                fileItem.innerHTML = `
                    <div class="mr-3">
                        ${isImage ? '<i class="fas fa-file-image text-gray-500 text-2xl"></i>' : '<i class="fas fa-file-pdf text-gray-500 text-2xl"></i>'}
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">${fileName}</p>
                        <p class="text-sm text-gray-600">${fileSize}</p>
                    </div>
                    <button onclick="removeFile(${index})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                fileList.appendChild(fileItem);
            });
        }

        function removeFile(index) {
            selectedFiles.splice(index, 1);
            renderFileList();
            submitBtn.disabled = selectedFiles.length === 0;
        }

        function simulateUpload() {
            confirmation.style.display = 'none';
            progressSection.style.display = 'block';
            progressFill.style.width = '0%';
            uploadPercent.textContent = '0';

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                progressFill.style.width = progress + '%';
                uploadPercent.textContent = Math.floor(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    progressSection.style.display = 'none';
                    confirmation.style.display = 'block';
                    selectedFiles.forEach(file => {
                        uploadHistory.push({
                            name: file.name,
                            size: (file.size / 1024 / 1024).toFixed(2),
                            date: new Date().toISOString().split('T')[0],
                            status: 'Uploaded'
                        });
                    });
                    localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
                    selectedFiles = [];
                    renderFileList();
                    submitBtn.disabled = true;
                }
            }, 200);
        }

        function renderHistory() {
            historyList.innerHTML = '';
            uploadHistory.forEach((item, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item fade-in';
                historyItem.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-file-pdf text-gray-500 text-2xl mr-3"></i>
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-sm text-gray-600">${item.size} MB | ${item.date}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded">${item.status}</span>
                        <button onclick="deleteHistory(${index})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                historyList.appendChild(historyItem);
            });
        }

        function deleteHistory(index) {
            uploadHistory.splice(index, 1);
            localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
            renderHistory();
        }

        function filterHistory() {
            const query = searchInput.value.toLowerCase();
            const filtered = uploadHistory.filter(item => item.name.toLowerCase().includes(query));
            historyList.innerHTML = '';
            filtered.forEach((item, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item fade-in';
                historyItem.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-file-pdf text-gray-500 text-2xl mr-3"></i>
                        <div>
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-sm text-gray-600">${item.size} MB | ${item.date}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded">${item.status}</span>
                        <button onclick="deleteHistory(${uploadHistory.indexOf(item)})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                historyList.appendChild(historyItem);
            });
        }

        renderHistory();