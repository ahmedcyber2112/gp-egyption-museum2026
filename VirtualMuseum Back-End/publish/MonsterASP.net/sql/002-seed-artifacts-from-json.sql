-- Auto-generated from src/Data/artifacts.json + categories.json
-- Safe to run multiple times (upsert pattern).
SET XACT_ABORT ON;
BEGIN TRANSACTION;

DECLARE @AdminUserId UNIQUEIDENTIFIER = (
    SELECT TOP 1 u.Id
    FROM [Users] u
    INNER JOIN [Roles] r ON r.Id = u.RoleId
    WHERE r.[Name] = N'Admin'
    ORDER BY u.CreatedAt
);

DECLARE @ArtifactId UNIQUEIDENTIFIER;
DECLARE @CategoryId UNIQUEIDENTIFIER;
DECLARE @EraId UNIQUEIDENTIFIER;
DECLARE @MaterialId UNIQUEIDENTIFIER;
DECLARE @DiscoveryLocationId UNIQUEIDENTIFIER;
DECLARE @ModelFileId UNIQUEIDENTIFIER;
DECLARE @ThumbFileId UNIQUEIDENTIFIER;

-- Hanging Obelisk of Ramses II
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'hanging-obelisk-of-ramses-ii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Grand Atrium & Entrance');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Grand Atrium & Entrance'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Red Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Red Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Tanis');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Tanis', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/fa3228f23bb641688f2e53db63f36384/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'hanging-obelisk-of-ramses-ii-3d-embed', N'text/html', N'https://sketchfab.com/models/fa3228f23bb641688f2e53db63f36384/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1skmvHxXOec2XxQ1LUHqlxiAz4_3emczu');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'hanging-obelisk-of-ramses-ii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1skmvHxXOec2XxQ1LUHqlxiAz4_3emczu', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'hanging-obelisk-of-ramses-ii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 16, NULL, NULL, 50, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 16,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = 50
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Hanging Obelisk of Ramses II',
        [Description] = N'A monumental red granite obelisk of Ramses II displayed in a unique suspended position, symbolizing royal authority and divine power.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Hanging Obelisk of Ramses II', N'A monumental red granite obelisk of Ramses II displayed in a unique suspended position, symbolizing royal authority and divine power.', N'Ramses II');
END;

-- Colossus of Ramses II
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'colossus-of-ramses-ii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Grand Atrium & Entrance');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Grand Atrium & Entrance'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Red Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Red Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Memphis');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Memphis', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/bcce3bd197024b0c87244997d5bfe7b3/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'colossus-of-ramses-ii-3d-embed', N'text/html', N'https://sketchfab.com/models/bcce3bd197024b0c87244997d5bfe7b3/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1m1vOrlEyu1lQcUmiIWoBAUkCvv_xfoVN');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'colossus-of-ramses-ii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1m1vOrlEyu1lQcUmiIWoBAUkCvv_xfoVN', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'colossus-of-ramses-ii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 11, NULL, NULL, 83, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 11,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = 83
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Colossus of Ramses II',
        [Description] = N'A colossal statue weighing over 80 tons, representing Ramses II in a majestic standing pose at the museum entrance.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Colossus of Ramses II', N'A colossal statue weighing over 80 tons, representing Ramses II in a majestic standing pose at the museum entrance.', N'Ramses II');
END;

-- Victory Column of Merneptah
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'victory-column-of-merneptah');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Grand Atrium & Entrance');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Grand Atrium & Entrance'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/abf4fe3821934833b1cd35bc17a0a723/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'victory-column-of-merneptah-3d-embed', N'text/html', N'https://sketchfab.com/models/abf4fe3821934833b1cd35bc17a0a723/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1T8kvXqt3JxFI3qeypbrMyXDZG_GXQJSl');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'victory-column-of-merneptah-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1T8kvXqt3JxFI3qeypbrMyXDZG_GXQJSl', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'victory-column-of-merneptah', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 3, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 3,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Victory Column of Merneptah',
        [Description] = N'A historical monument celebrating the military victories of King Merneptah, inscribed with significant achievements.',
        [HistoricalStory] = N'Merneptah'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Victory Column of Merneptah', N'A historical monument celebrating the military victories of King Merneptah, inscribed with significant achievements.', N'Merneptah');
END;

-- Statue of Senusret I
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-senusret-i');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Middle Kingdom, 12th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Middle Kingdom, 12th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Lisht');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Lisht', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/0ef8948879b54309a090d5d69bd86c70/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-senusret-i-3d-embed', N'text/html', N'https://sketchfab.com/models/0ef8948879b54309a090d5d69bd86c70/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1X-kGnb5UOHT3uQpgYZkalSBa2W2USU3B');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-senusret-i-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1X-kGnb5UOHT3uQpgYZkalSBa2W2USU3B', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-senusret-i', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Senusret I',
        [Description] = N'A refined statue representing Senusret I, reflecting the artistic precision of the Middle Kingdom.',
        [HistoricalStory] = N'Senusret I'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Senusret I', N'A refined statue representing Senusret I, reflecting the artistic precision of the Middle Kingdom.', N'Senusret I');
END;

-- Head of Amenhotep III
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'head-of-amenhotep-iii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Quartzite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Quartzite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/ff3dd192a81944a0a93a54beb8a7a27f/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'head-of-amenhotep-iii-3d-embed', N'text/html', N'https://sketchfab.com/models/ff3dd192a81944a0a93a54beb8a7a27f/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1K2KO0vJvW8ezRtxs2cU31tfzmbgZTXB-');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'head-of-amenhotep-iii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1K2KO0vJvW8ezRtxs2cU31tfzmbgZTXB-', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'head-of-amenhotep-iii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Head of Amenhotep III',
        [Description] = N'A sculpted royal head of Amenhotep III showing idealized features and fine craftsmanship.',
        [HistoricalStory] = N'Amenhotep III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Head of Amenhotep III', N'A sculpted royal head of Amenhotep III showing idealized features and fine craftsmanship.', N'Amenhotep III');
END;

-- Statue of Hatshepsut
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-hatshepsut');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Deir el-Bahari');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Deir el-Bahari', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b19723439bd2426fb915d67482235d8d/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-hatshepsut-3d-embed', N'text/html', N'https://sketchfab.com/models/b19723439bd2426fb915d67482235d8d/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1YAeSXsfXAPXyDQmoNKcuFeNT1vajKAUc');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-hatshepsut-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1YAeSXsfXAPXyDQmoNKcuFeNT1vajKAUc', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-hatshepsut', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Hatshepsut',
        [Description] = N'A powerful depiction of Queen Hatshepsut in kingly form, emphasizing her authority as a female pharaoh.',
        [HistoricalStory] = N'Hatshepsut'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Hatshepsut', N'A powerful depiction of Queen Hatshepsut in kingly form, emphasizing her authority as a female pharaoh.', N'Hatshepsut');
END;

-- Statue of Thutmose III
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-thutmose-iii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Karnak');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Karnak', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/a906d679a1bb4862b21f13d98d2362c3/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-thutmose-iii-3d-embed', N'text/html', N'https://sketchfab.com/models/a906d679a1bb4862b21f13d98d2362c3/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1M7R7h4ULGNpRhyS3QAB0Xb5M5ViGd3uz');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-thutmose-iii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1M7R7h4ULGNpRhyS3QAB0Xb5M5ViGd3uz', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-thutmose-iii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Thutmose III',
        [Description] = N'A statue of Thutmose III, one of Egyptâ€™s greatest military rulers, symbolizing strength and expansion.',
        [HistoricalStory] = N'Thutmose III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Thutmose III', N'A statue of Thutmose III, one of Egyptâ€™s greatest military rulers, symbolizing strength and expansion.', N'Thutmose III');
END;

-- Seated Statue of Ramses II
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'seated-statue-of-ramses-ii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Luxor');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Luxor', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/94de28f4890e4cfab99fad8c31c72bae/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'seated-statue-of-ramses-ii-3d-embed', N'text/html', N'https://sketchfab.com/models/94de28f4890e4cfab99fad8c31c72bae/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1U82Q759C3V3MAhreyFH1F1WzU3G8eqZk');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'seated-statue-of-ramses-ii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1U82Q759C3V3MAhreyFH1F1WzU3G8eqZk', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'seated-statue-of-ramses-ii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.8, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.8,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Seated Statue of Ramses II',
        [Description] = N'A seated statue of Ramses II representing stability, divine rule, and timeless authority.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Seated Statue of Ramses II', N'A seated statue of Ramses II representing stability, divine rule, and timeless authority.', N'Ramses II');
END;

-- Statue of Seti II
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-seti-ii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/04939d0ee40f4542962b69a9a1f08271/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-seti-ii-3d-embed', N'text/html', N'https://sketchfab.com/models/04939d0ee40f4542962b69a9a1f08271/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1B83ftW1aIUFzAnFzYV7Y40FHiB0_4Osd');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-seti-ii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1B83ftW1aIUFzAnFzYV7Y40FHiB0_4Osd', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-seti-ii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Seti II',
        [Description] = N'A statue of Seti II reflecting the artistic traditions and royal continuity of the late New Kingdom.',
        [HistoricalStory] = N'Seti II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Seti II', N'A statue of Seti II reflecting the artistic traditions and royal continuity of the late New Kingdom.', N'Seti II');
END;

-- Double Statue of Ramses II and Ra-Horakhty
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'double-statue-of-ramses-ii-and-ra-horakhty');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Heliopolis');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Heliopolis', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/d8e43c1622f34f07889700ffe03f1848/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'double-statue-of-ramses-ii-and-ra-horakhty-3d-embed', N'text/html', N'https://sketchfab.com/models/d8e43c1622f34f07889700ffe03f1848/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1psjuMekNFdie-HIKuDLDm7fuCi3Hnh-s');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'double-statue-of-ramses-ii-and-ra-horakhty-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1psjuMekNFdie-HIKuDLDm7fuCi3Hnh-s', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'double-statue-of-ramses-ii-and-ra-horakhty', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Double Statue of Ramses II and Ra-Horakhty',
        [Description] = N'A symbolic double statue showing Ramses II alongside the sun god Ra-Horakhty, emphasizing divine kingship.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Double Statue of Ramses II and Ra-Horakhty', N'A symbolic double statue showing Ramses II alongside the sun god Ra-Horakhty, emphasizing divine kingship.', N'Ramses II');
END;

-- Statue of Amenemhat III
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-amenemhat-iii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Middle Kingdom, 12th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Middle Kingdom, 12th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Fayoum');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Fayoum', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/d5c86e05d9e04df3946fbf46a14152e8/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-amenemhat-iii-3d-embed', N'text/html', N'https://sketchfab.com/models/d5c86e05d9e04df3946fbf46a14152e8/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1K4CxjQuM3sPV1T3NPlOdA7r_BUzWTD3F');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-amenemhat-iii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1K4CxjQuM3sPV1T3NPlOdA7r_BUzWTD3F', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-amenemhat-iii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.1, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.1,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Amenemhat III',
        [Description] = N'A powerful statue of Amenemhat III highlighting the strength and realism of Middle Kingdom sculpture.',
        [HistoricalStory] = N'Amenemhat III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Amenemhat III', N'A powerful statue of Amenemhat III highlighting the strength and realism of Middle Kingdom sculpture.', N'Amenemhat III');
END;

-- Statue of Nectanebo I
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-nectanebo-i');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period, 30th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period, 30th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/ad26723e563c4855803a6d0e7bdee483/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-nectanebo-i-3d-embed', N'text/html', N'https://sketchfab.com/models/ad26723e563c4855803a6d0e7bdee483/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1YRQeuZ3Y5eQjVnQ4hWKr5HmQahIL4OIR');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-nectanebo-i-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1YRQeuZ3Y5eQjVnQ4hWKr5HmQahIL4OIR', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-nectanebo-i', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.9, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.9,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Nectanebo I',
        [Description] = N'A statue of Nectanebo I representing the last native Egyptian dynasties before foreign rule.',
        [HistoricalStory] = N'Nectanebo I'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Nectanebo I', N'A statue of Nectanebo I representing the last native Egyptian dynasties before foreign rule.', N'Nectanebo I');
END;

-- Statue of Merneptah
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-merneptah');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/35f203a5ae154258901f48202bfdbd6f/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-merneptah-3d-embed', N'text/html', N'https://sketchfab.com/models/35f203a5ae154258901f48202bfdbd6f/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=14agzkeOGN9UTOV6ZquewFSSacxspBQDa');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-merneptah-thumb', N'image', N'https://drive.google.com/uc?export=view&id=14agzkeOGN9UTOV6ZquewFSSacxspBQDa', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-merneptah', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Merneptah',
        [Description] = N'A statue of King Merneptah emphasizing royal authority and continuity after Ramses II.',
        [HistoricalStory] = N'Merneptah'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Merneptah', N'A statue of King Merneptah emphasizing royal authority and continuity after Ramses II.', N'Merneptah');
END;

-- Statue of Emperor Augustus
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-emperor-augustus');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Roman Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Roman Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Alexandria');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Alexandria', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/42b5fd63307b48cfb073370be3ff259b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-emperor-augustus-3d-embed', N'text/html', N'https://sketchfab.com/models/42b5fd63307b48cfb073370be3ff259b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1keU-0wC2g_2S8BZn7BxCl3E6E6WmykWw');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-emperor-augustus-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1keU-0wC2g_2S8BZn7BxCl3E6E6WmykWw', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-emperor-augustus', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Emperor Augustus',
        [Description] = N'A Roman-era statue of Emperor Augustus depicted in Egyptian royal style, showing cultural integration.',
        [HistoricalStory] = N'Augustus'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Emperor Augustus', N'A Roman-era statue of Emperor Augustus depicted in Egyptian royal style, showing cultural integration.', N'Augustus');
END;

-- Statue of Senusret III
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-senusret-iii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Middle Kingdom, 12th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Middle Kingdom, 12th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Abydos');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Abydos', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/0ef8948879b54309a090d5d69bd86c70/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-senusret-iii-3d-embed', N'text/html', N'https://sketchfab.com/models/0ef8948879b54309a090d5d69bd86c70/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1UIew1oo6bfsVyzTtKZ-1O2ycmdffet0k');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-senusret-iii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1UIew1oo6bfsVyzTtKZ-1O2ycmdffet0k', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-senusret-iii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.1, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.1,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Senusret III',
        [Description] = N'A striking statue of Senusret III known for its realistic facial features and powerful expression.',
        [HistoricalStory] = N'Senusret III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Senusret III', N'A striking statue of Senusret III known for its realistic facial features and powerful expression.', N'Senusret III');
END;

-- Hathor Column Capital from Dendera
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'hathor-column-capital-from-dendera');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Ptolemaic Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Ptolemaic Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Sandstone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Sandstone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Dendera');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Dendera', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/55d5bc1d94c94186bfbf5c791e8a5d4e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'hathor-column-capital-from-dendera-3d-embed', N'text/html', N'https://sketchfab.com/models/55d5bc1d94c94186bfbf5c791e8a5d4e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1ilLqXWi40E5E6Oc58THP_g3PHBwrg3L5');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'hathor-column-capital-from-dendera-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1ilLqXWi40E5E6Oc58THP_g3PHBwrg3L5', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'hathor-column-capital-from-dendera', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Hathor Column Capital from Dendera',
        [Description] = N'A beautifully carved column capital depicting the face of the goddess Hathor, symbolizing joy and music.',
        [HistoricalStory] = N'Dendera Temple'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Hathor Column Capital from Dendera', N'A beautifully carved column capital depicting the face of the goddess Hathor, symbolizing joy and music.', N'Dendera Temple');
END;

-- Papyrus Column from Old Kingdom
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'papyrus-column-from-old-kingdom');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Old Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Old Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/1da186ddee4a4621a6853abb0498cceb/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'papyrus-column-from-old-kingdom-3d-embed', N'text/html', N'https://sketchfab.com/models/1da186ddee4a4621a6853abb0498cceb/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1QoaA6pF_2msclWUt8HVOhaiodKZROzgF');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'papyrus-column-from-old-kingdom-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1QoaA6pF_2msclWUt8HVOhaiodKZROzgF', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'papyrus-column-from-old-kingdom', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 3.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 3.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Papyrus Column from Old Kingdom',
        [Description] = N'A papyrus-shaped column symbolizing the marshlands of creation in ancient Egyptian cosmology.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Papyrus Column from Old Kingdom', N'A papyrus-shaped column symbolizing the marshlands of creation in ancient Egyptian cosmology.', N'Unknown');
END;

-- Offering Relief of Ramses II
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'offering-relief-of-ramses-ii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Sandstone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Sandstone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Luxor');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Luxor', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/af9b7dfcf5914c0b9feff35b30c9d2ba/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'offering-relief-of-ramses-ii-3d-embed', N'text/html', N'https://sketchfab.com/models/af9b7dfcf5914c0b9feff35b30c9d2ba/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1BpboIs3vHl-mOvEOzXmRHuj7I2cF0tZo');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'offering-relief-of-ramses-ii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1BpboIs3vHl-mOvEOzXmRHuj7I2cF0tZo', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'offering-relief-of-ramses-ii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, 2, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = 2,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Offering Relief of Ramses II',
        [Description] = N'A carved relief showing Ramses II presenting offerings to the gods, symbolizing devotion and divine favor.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Offering Relief of Ramses II', N'A carved relief showing Ramses II presenting offerings to the gods, symbolizing devotion and divine favor.', N'Ramses II');
END;

-- Mini Limestone Pyramidion
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'mini-limestone-pyramidion');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/7a770008f6734b43bae9305100b73894/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'mini-limestone-pyramidion-3d-embed', N'text/html', N'https://sketchfab.com/models/7a770008f6734b43bae9305100b73894/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1sjMapVHDzKdFPo4JhXjRuOPGXOavfpxa');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'mini-limestone-pyramidion-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1sjMapVHDzKdFPo4JhXjRuOPGXOavfpxa', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'mini-limestone-pyramidion', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Mini Limestone Pyramidion',
        [Description] = N'A small pyramidion that once crowned a pyramid, symbolizing the sunâ€™s rays and rebirth.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Mini Limestone Pyramidion', N'A small pyramidion that once crowned a pyramid, symbolizing the sunâ€™s rays and rebirth.', N'Unknown');
END;

-- Statue of Hapi (Nile God)
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-hapi-nile-god');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Aswan');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Aswan', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/7352f0c88f2f424a9d3dbd1c34c854cf/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-hapi-nile-god-3d-embed', N'text/html', N'https://sketchfab.com/models/7352f0c88f2f424a9d3dbd1c34c854cf/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1c3fTVrHnN6_D2KiLTAVqsVHoi6YZ7xX1');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-hapi-nile-god-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1c3fTVrHnN6_D2KiLTAVqsVHoi6YZ7xX1', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-hapi-nile-god', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.7, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.7,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Hapi (Nile God)',
        [Description] = N'A statue of Hapi, the Nile god, shown carrying offerings symbolizing fertility and abundance.',
        [HistoricalStory] = N'Nile God Hapi'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Hapi (Nile God)', N'A statue of Hapi, the Nile god, shown carrying offerings symbolizing fertility and abundance.', N'Nile God Hapi');
END;

-- Lintel of Ramses III
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'lintel-of-ramses-iii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 20th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 20th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Medinet Habu');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Medinet Habu', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/7db61639f499423fb448ee62594e7372/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'lintel-of-ramses-iii-3d-embed', N'text/html', N'https://sketchfab.com/models/7db61639f499423fb448ee62594e7372/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1W8ZyvMLKiJe_0t5kb6CKhOHPpPEgefy-');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'lintel-of-ramses-iii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1W8ZyvMLKiJe_0t5kb6CKhOHPpPEgefy-', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'lintel-of-ramses-iii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, 2.5, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = 2.5,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Lintel of Ramses III',
        [Description] = N'A granite lintel from the reign of Ramses III decorated with inscriptions and royal titles.',
        [HistoricalStory] = N'Ramses III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Lintel of Ramses III', N'A granite lintel from the reign of Ramses III decorated with inscriptions and royal titles.', N'Ramses III');
END;

-- Statue of Sekhmet
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-sekhmet');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Karnak');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Karnak', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/24bb4e64e3124fe793e314c760b297b7/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-sekhmet-3d-embed', N'text/html', N'https://sketchfab.com/models/24bb4e64e3124fe793e314c760b297b7/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=120KxtVFmggCXYN8ZjsiPyFVEU4IJW1Mk');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-sekhmet-thumb', N'image', N'https://drive.google.com/uc?export=view&id=120KxtVFmggCXYN8ZjsiPyFVEU4IJW1Mk', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-sekhmet', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Sekhmet',
        [Description] = N'A powerful statue of the lion-headed goddess Sekhmet, symbolizing war and healing.',
        [HistoricalStory] = N'Sekhmet'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Sekhmet', N'A powerful statue of the lion-headed goddess Sekhmet, symbolizing war and healing.', N'Sekhmet');
END;

-- Statue of Ptah
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-ptah');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Memphis');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Memphis', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/eb7e0eaacb284075b1045fad2a3c980e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-ptah-3d-embed', N'text/html', N'https://sketchfab.com/models/eb7e0eaacb284075b1045fad2a3c980e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1OsXw4BEia44_6uwvu8XDgvqlSzrNVL8E');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-ptah-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1OsXw4BEia44_6uwvu8XDgvqlSzrNVL8E', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-ptah', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.8, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.8,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Ptah',
        [Description] = N'A statue of Ptah, the creator god, depicted in mummiform shape holding a staff of power.',
        [HistoricalStory] = N'Ptah'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Ptah', N'A statue of Ptah, the creator god, depicted in mummiform shape holding a staff of power.', N'Ptah');
END;

-- Statue of Min
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-min');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Akhmim');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Akhmim', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b5a0d73920ea494e8f1f9500146a486a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-min-3d-embed', N'text/html', N'https://sketchfab.com/models/b5a0d73920ea494e8f1f9500146a486a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1mO5YHq73KHg4FYIxj503m9c-Tzj3rizc');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-min-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1mO5YHq73KHg4FYIxj503m9c-Tzj3rizc', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-min', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.6, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.6,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Min',
        [Description] = N'A statue of the fertility god Min, associated with regeneration and agricultural prosperity.',
        [HistoricalStory] = N'Min'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Min', N'A statue of the fertility god Min, associated with regeneration and agricultural prosperity.', N'Min');
END;

-- Column from Medinet Habu
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'column-from-medinet-habu');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 20th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 20th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Sandstone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Sandstone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Medinet Habu');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Medinet Habu', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/38ccbe0f0fd6402ca176d3e58466ff34/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'column-from-medinet-habu-3d-embed', N'text/html', N'https://sketchfab.com/models/38ccbe0f0fd6402ca176d3e58466ff34/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1qwpACTIA4SEVvoJTQxktvcyH0N_TpJHl');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'column-from-medinet-habu-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1qwpACTIA4SEVvoJTQxktvcyH0N_TpJHl', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'column-from-medinet-habu', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 4, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 4,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Column from Medinet Habu',
        [Description] = N'A decorated column from Medinet Habu, featuring reliefs of Ramses III and religious scenes.',
        [HistoricalStory] = N'Ramses III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Column from Medinet Habu', N'A decorated column from Medinet Habu, featuring reliefs of Ramses III and religious scenes.', N'Ramses III');
END;

-- Head of Goddess Hathor
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'head-of-goddess-hathor');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Dendera');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Dendera', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/a71451d924f84957af8bf2b6c694a080/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'head-of-goddess-hathor-3d-embed', N'text/html', N'https://sketchfab.com/models/a71451d924f84957af8bf2b6c694a080/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=14LykyzAmCABFUCrtehqD4wGxvuT3osVh');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'head-of-goddess-hathor-thumb', N'image', N'https://drive.google.com/uc?export=view&id=14LykyzAmCABFUCrtehqD4wGxvuT3osVh', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'head-of-goddess-hathor', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Head of Goddess Hathor',
        [Description] = N'A finely carved head of the goddess Hathor, symbolizing love, music, and motherhood.',
        [HistoricalStory] = N'Hathor'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Head of Goddess Hathor', N'A finely carved head of the goddess Hathor, symbolizing love, music, and motherhood.', N'Hathor');
END;

-- Statue of Anubis
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-anubis');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood with gold leaf');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood with gold leaf'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/8112b2f35d454e62a12885df575d1f2e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-anubis-3d-embed', N'text/html', N'https://sketchfab.com/models/8112b2f35d454e62a12885df575d1f2e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1JLethDp-Eq4exLH-dEbUKY8oGotbqY9y');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-anubis-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1JLethDp-Eq4exLH-dEbUKY8oGotbqY9y', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-anubis', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Anubis',
        [Description] = N'A statue of Anubis, the jackal-headed god of mummification and the afterlife.',
        [HistoricalStory] = N'Anubis'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Anubis', N'A statue of Anubis, the jackal-headed god of mummification and the afterlife.', N'Anubis');
END;

-- Small Obelisk of Ramses II
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'small-obelisk-of-ramses-ii');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Heliopolis');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Heliopolis', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/6da040d85c1b4e918ef0663c7a01be91/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'small-obelisk-of-ramses-ii-3d-embed', N'text/html', N'https://sketchfab.com/models/6da040d85c1b4e918ef0663c7a01be91/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1nN1O4NZ6-am5Qjxg9GT4BdaM9yPhlpND');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'small-obelisk-of-ramses-ii-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1nN1O4NZ6-am5Qjxg9GT4BdaM9yPhlpND', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'small-obelisk-of-ramses-ii', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 3, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 3,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Small Obelisk of Ramses II',
        [Description] = N'A smaller obelisk dedicated to Ramses II, inscribed with royal cartouches and solar symbols.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Small Obelisk of Ramses II', N'A smaller obelisk dedicated to Ramses II, inscribed with royal cartouches and solar symbols.', N'Ramses II');
END;

-- Horemheb before Amun
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'horemheb-before-amun');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Karnak');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Karnak', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/3399601086ba45eb9058d4a88ebf3a81/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'horemheb-before-amun-3d-embed', N'text/html', N'https://sketchfab.com/models/3399601086ba45eb9058d4a88ebf3a81/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1yMYnvxw1rdf2cCZLaKnik_HbE8b6t180');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'horemheb-before-amun-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1yMYnvxw1rdf2cCZLaKnik_HbE8b6t180', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'horemheb-before-amun', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.3, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.3,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Horemheb before Amun',
        [Description] = N'A statue of King Horemheb standing before the god Amun, reinforcing his divine support.',
        [HistoricalStory] = N'Horemheb'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Horemheb before Amun', N'A statue of King Horemheb standing before the god Amun, reinforcing his divine support.', N'Horemheb');
END;

-- Seti I with Isis
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'seti-i-with-isis');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Abydos');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Abydos', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/0b89d80f200d4e46b3aad888232e0800/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'seti-i-with-isis-3d-embed', N'text/html', N'https://sketchfab.com/models/0b89d80f200d4e46b3aad888232e0800/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1yS4xeJ6iVPVSOpnWqk7Hv6XGWMnRut7h');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'seti-i-with-isis-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1yS4xeJ6iVPVSOpnWqk7Hv6XGWMnRut7h', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'seti-i-with-isis', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.2, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.2,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Seti I with Isis',
        [Description] = N'A statue of Seti I accompanied by the goddess Isis, symbolizing protection and divine blessing.',
        [HistoricalStory] = N'Seti I'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Seti I with Isis', N'A statue of Seti I accompanied by the goddess Isis, symbolizing protection and divine blessing.', N'Seti I');
END;

-- Ramses II as a Child with Hauron
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'ramses-ii-as-a-child-with-hauron');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Giza');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Giza', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/fdd6e19fff6a450c9e99f73ab93c802a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'ramses-ii-as-a-child-with-hauron-3d-embed', N'text/html', N'https://sketchfab.com/models/fdd6e19fff6a450c9e99f73ab93c802a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1cfqBTRr3Y2kqhSmbuZX-Es-OVCtCLOz3');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'ramses-ii-as-a-child-with-hauron-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1cfqBTRr3Y2kqhSmbuZX-Es-OVCtCLOz3', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'ramses-ii-as-a-child-with-hauron', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.8, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.8,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Ramses II as a Child with Hauron',
        [Description] = N'A statue showing Ramses II depicted as a child under the protection of the god Hauron.',
        [HistoricalStory] = N'Ramses II'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Ramses II as a Child with Hauron', N'A statue showing Ramses II depicted as a child under the protection of the god Hauron.', N'Ramses II');
END;

-- Osiris Enthroned Statue
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'osiris-enthroned-statue');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Bronze');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Bronze'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Abydos');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Abydos', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/2672b0ba28f04235a714c1adfa5e8481/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'osiris-enthroned-statue-3d-embed', N'text/html', N'https://sketchfab.com/models/2672b0ba28f04235a714c1adfa5e8481/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1BQvX7pOpY2N4kMQAABFL3QRPopemUez0');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'osiris-enthroned-statue-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1BQvX7pOpY2N4kMQAABFL3QRPopemUez0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'osiris-enthroned-statue', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Osiris Enthroned Statue',
        [Description] = N'A seated statue of Osiris, god of the afterlife, symbolizing resurrection and eternal life.',
        [HistoricalStory] = N'Osiris'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Osiris Enthroned Statue', N'A seated statue of Osiris, god of the afterlife, symbolizing resurrection and eternal life.', N'Osiris');
END;

-- Isis Nursing Horus
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'isis-nursing-horus');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Bronze');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Bronze'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Philae');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Philae', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/dae262f0dc5247f5a37be09ce4f17a1b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'isis-nursing-horus-3d-embed', N'text/html', N'https://sketchfab.com/models/dae262f0dc5247f5a37be09ce4f17a1b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1NhrV8R8n2v2ML556-7AqUAQj-fnu4eb4');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'isis-nursing-horus-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1NhrV8R8n2v2ML556-7AqUAQj-fnu4eb4', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'isis-nursing-horus', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 0.8, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 0.8,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Isis Nursing Horus',
        [Description] = N'A tender depiction of Isis nursing the infant Horus, symbolizing motherhood and divine protection.',
        [HistoricalStory] = N'Isis'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Isis Nursing Horus', N'A tender depiction of Isis nursing the infant Horus, symbolizing motherhood and divine protection.', N'Isis');
END;

-- Statue of Queen Nefertari
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statue-of-queen-nefertari');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'The Grand Staircase');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'The Grand Staircase'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b23dca993f594b9088ea57f26820d8b4/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statue-of-queen-nefertari-3d-embed', N'text/html', N'https://sketchfab.com/models/b23dca993f594b9088ea57f26820d8b4/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1uMF1DchsPdlbG6_cXPPoMZwqWmwATP5B');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statue-of-queen-nefertari-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1uMF1DchsPdlbG6_cXPPoMZwqWmwATP5B', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statue-of-queen-nefertari', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.7, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.7,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statue of Queen Nefertari',
        [Description] = N'A refined statue of Queen Nefertari, the Great Royal Wife of Ramses II.',
        [HistoricalStory] = N'Nefertari'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statue of Queen Nefertari', N'A refined statue of Queen Nefertari, the Great Royal Wife of Ramses II.', N'Nefertari');
END;

-- Sarcophagus of Queen Hetepheres
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'sarcophagus-of-queen-hetepheres');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Old Kingdom, 4th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Old Kingdom, 4th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Alabaster');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Alabaster'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Giza');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Giza', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/bc4bd5ea1df34e59992e5cdf1705f3fc/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'sarcophagus-of-queen-hetepheres-3d-embed', N'text/html', N'https://sketchfab.com/models/bc4bd5ea1df34e59992e5cdf1705f3fc/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=12lb5lEeF72n3ottPID0YVefPwR9zmSGA');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'sarcophagus-of-queen-hetepheres-thumb', N'image', N'https://drive.google.com/uc?export=view&id=12lb5lEeF72n3ottPID0YVefPwR9zmSGA', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'sarcophagus-of-queen-hetepheres', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Sarcophagus of Queen Hetepheres',
        [Description] = N'An Old Kingdom sarcophagus belonging to Queen Hetepheres, mother of Khufu.',
        [HistoricalStory] = N'Hetepheres'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Sarcophagus of Queen Hetepheres', N'An Old Kingdom sarcophagus belonging to Queen Hetepheres, mother of Khufu.', N'Hetepheres');
END;

-- Granite Sarcophagus of Merneptah
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'granite-sarcophagus-of-merneptah');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Red Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Red Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/f387259dd60b4f8ab83d15a51c128408/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'granite-sarcophagus-of-merneptah-3d-embed', N'text/html', N'https://sketchfab.com/models/f387259dd60b4f8ab83d15a51c128408/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1gcHeuhYGW7-urordo89C7kmNHEFOExTK');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'granite-sarcophagus-of-merneptah-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1gcHeuhYGW7-urordo89C7kmNHEFOExTK', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'granite-sarcophagus-of-merneptah', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Granite Sarcophagus of Merneptah',
        [Description] = N'A massive granite sarcophagus belonging to King Merneptah, richly inscribed.',
        [HistoricalStory] = N'Merneptah'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Granite Sarcophagus of Merneptah', N'A massive granite sarcophagus belonging to King Merneptah, richly inscribed.', N'Merneptah');
END;

-- Quartzite Sarcophagus of Thutmose I
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'quartzite-sarcophagus-of-thutmose-i');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Quartzite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Quartzite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/9981999960594db89d0b8dec13390264/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'quartzite-sarcophagus-of-thutmose-i-3d-embed', N'text/html', N'https://sketchfab.com/models/9981999960594db89d0b8dec13390264/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'quartzite-sarcophagus-of-thutmose-i-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'quartzite-sarcophagus-of-thutmose-i', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Quartzite Sarcophagus of Thutmose I',
        [Description] = N'A quartzite sarcophagus belonging to Thutmose I, richly decorated with protective spells.',
        [HistoricalStory] = N'Thutmose I'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Quartzite Sarcophagus of Thutmose I', N'A quartzite sarcophagus belonging to Thutmose I, richly decorated with protective spells.', N'Thutmose I');
END;

-- Sarcophagus of Tiye
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'sarcophagus-of-tiye');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood with gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood with gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/0bc5a237388d4e648d27ac4736ede617/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'sarcophagus-of-tiye-3d-embed', N'text/html', N'https://sketchfab.com/models/0bc5a237388d4e648d27ac4736ede617/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'sarcophagus-of-tiye-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'sarcophagus-of-tiye', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Sarcophagus of Tiye',
        [Description] = N'Wooden coffin of Queen Tiye, adorned with gilded funerary inscriptions and divine motifs.',
        [HistoricalStory] = N'Tiye'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Sarcophagus of Tiye', N'Wooden coffin of Queen Tiye, adorned with gilded funerary inscriptions and divine motifs.', N'Tiye');
END;

-- Granite Sarcophagus from Dynasty 26
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'granite-sarcophagus-from-dynasty-26');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period, 26th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period, 26th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/bd76c8e653604e9288a8ba07143bb041/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'granite-sarcophagus-from-dynasty-26-3d-embed', N'text/html', N'https://sketchfab.com/models/bd76c8e653604e9288a8ba07143bb041/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'granite-sarcophagus-from-dynasty-26-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'granite-sarcophagus-from-dynasty-26', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Granite Sarcophagus from Dynasty 26',
        [Description] = N'A massive granite sarcophagus from the 26th Dynasty, designed to protect the deceased''s body for eternity.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Granite Sarcophagus from Dynasty 26', N'A massive granite sarcophagus from the 26th Dynasty, designed to protect the deceased''s body for eternity.', N'Unknown');
END;

-- Coffin of Hatshepsut
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'coffin-of-hatshepsut');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood and paint');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood and paint'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Deir el-Bahari');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Deir el-Bahari', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/7dfd0e2f89e54c33baf4f383a8678cd7/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'coffin-of-hatshepsut-3d-embed', N'text/html', N'https://sketchfab.com/models/7dfd0e2f89e54c33baf4f383a8678cd7/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'coffin-of-hatshepsut-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'coffin-of-hatshepsut', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Coffin of Hatshepsut',
        [Description] = N'The original coffin of Queen Hatshepsut before alterations, showcasing exquisite New Kingdom artistry.',
        [HistoricalStory] = N'Hatshepsut'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Coffin of Hatshepsut', N'The original coffin of Queen Hatshepsut before alterations, showcasing exquisite New Kingdom artistry.', N'Hatshepsut');
END;

-- Painted Wooden Coffin Lid
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'painted-wooden-coffin-lid');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood with paint');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood with paint'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Deir el-Bahari');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Deir el-Bahari', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/d62befca88c14a91aef9c0748e998d07/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'painted-wooden-coffin-lid-3d-embed', N'text/html', N'https://sketchfab.com/models/d62befca88c14a91aef9c0748e998d07/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'painted-wooden-coffin-lid-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'painted-wooden-coffin-lid', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Painted Wooden Coffin Lid',
        [Description] = N'A painted lid of a wooden coffin from the Deir el-Bahari cache, decorated with colorful motifs.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Painted Wooden Coffin Lid', N'A painted lid of a wooden coffin from the Deir el-Bahari cache, decorated with colorful motifs.', N'Unknown');
END;

-- Sarcophagus of Psamtik
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'sarcophagus-of-psamtik');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/33e8ca175ff84d798402fb981cb71cf5/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'sarcophagus-of-psamtik-3d-embed', N'text/html', N'https://sketchfab.com/models/33e8ca175ff84d798402fb981cb71cf5/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'sarcophagus-of-psamtik-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'sarcophagus-of-psamtik', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Sarcophagus of Psamtik',
        [Description] = N'A limestone sarcophagus belonging to Psamtik, adorned with hieroglyphs and divine imagery.',
        [HistoricalStory] = N'Psamtik'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Sarcophagus of Psamtik', N'A limestone sarcophagus belonging to Psamtik, adorned with hieroglyphs and divine imagery.', N'Psamtik');
END;

-- Sarcophagus with Book of the Dead Texts
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'sarcophagus-with-book-of-the-dead-texts');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/26fd99e1e2c1405684b4fca701b1127a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'sarcophagus-with-book-of-the-dead-texts-3d-embed', N'text/html', N'https://sketchfab.com/models/26fd99e1e2c1405684b4fca701b1127a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'sarcophagus-with-book-of-the-dead-texts-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'sarcophagus-with-book-of-the-dead-texts', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Sarcophagus with Book of the Dead Texts',
        [Description] = N'A limestone sarcophagus featuring hieroglyphs from the Book of the Dead to guide the deceased.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Sarcophagus with Book of the Dead Texts', N'A limestone sarcophagus featuring hieroglyphs from the Book of the Dead to guide the deceased.', N'Unknown');
END;

-- Anthropoid Sarcophagus
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'anthropoid-sarcophagus');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Giza');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Giza', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/edf8580f2a5f45a8aabc53de2058da4b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'anthropoid-sarcophagus-3d-embed', N'text/html', N'https://sketchfab.com/models/edf8580f2a5f45a8aabc53de2058da4b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'anthropoid-sarcophagus-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'anthropoid-sarcophagus', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Anthropoid Sarcophagus',
        [Description] = N'A human-shaped (Anthropoid) granite sarcophagus from the Late Period.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Anthropoid Sarcophagus', N'A human-shaped (Anthropoid) granite sarcophagus from the Late Period.', N'Unknown');
END;

-- Sarcophagus with Funerary Texts
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'sarcophagus-with-funerary-texts');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Journey to Eternity');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Journey to Eternity'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Late Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Late Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood and gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood and gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b991224b8b83438cbc96abe60f419558/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'sarcophagus-with-funerary-texts-3d-embed', N'text/html', N'https://sketchfab.com/models/b991224b8b83438cbc96abe60f419558/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'sarcophagus-with-funerary-texts-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'sarcophagus-with-funerary-texts', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Sarcophagus with Funerary Texts',
        [Description] = N'A coffin bearing sacred texts from the Book of the Dead for protection in the afterlife.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Sarcophagus with Funerary Texts', N'A coffin bearing sacred texts from the Book of the Dead for protection in the afterlife.', N'Unknown');
END;

-- Tutankhamun's Golden Mask
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'tutankhamuns-golden-mask');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Solid Gold, Lapis Lazuli');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Solid Gold, Lapis Lazuli'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/992c57047cdf4412b970ad798d5ad0c9/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'tutankhamuns-golden-mask-3d-embed', N'text/html', N'https://sketchfab.com/models/992c57047cdf4412b970ad798d5ad0c9/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'tutankhamuns-golden-mask-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'tutankhamuns-golden-mask', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 54, NULL, NULL, 11, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 54,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = 11
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Tutankhamun''s Golden Mask',
        [Description] = N'The iconic funerary mask of solid gold and semi-precious stones, representing the boy king as a god.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Tutankhamun''s Golden Mask', N'The iconic funerary mask of solid gold and semi-precious stones, representing the boy king as a god.', N'Tutankhamun');
END;

-- Inner Golden Coffin
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'inner-golden-coffin');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Solid Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Solid Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/e83d63e2e21f48e19ad7c28b2671348d/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'inner-golden-coffin-3d-embed', N'text/html', N'https://sketchfab.com/models/e83d63e2e21f48e19ad7c28b2671348d/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'inner-golden-coffin-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'inner-golden-coffin', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Inner Golden Coffin',
        [Description] = N'The innermost coffin of Tutankhamun made of solid gold, found inside the middle coffin.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Inner Golden Coffin', N'The innermost coffin of Tutankhamun made of solid gold, found inside the middle coffin.', N'Tutankhamun');
END;

-- Outer Quartzite Sarcophagus
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'outer-quartzite-sarcophagus');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Quartzite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Quartzite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/2aaf85ca66b044e3aa2ccda0d9c3b33b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'outer-quartzite-sarcophagus-3d-embed', N'text/html', N'https://sketchfab.com/models/2aaf85ca66b044e3aa2ccda0d9c3b33b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'outer-quartzite-sarcophagus-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'outer-quartzite-sarcophagus', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Outer Quartzite Sarcophagus',
        [Description] = N'The massive stone box that housed the golden coffins, decorated with protective deities at the corners.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Outer Quartzite Sarcophagus', N'The massive stone box that housed the golden coffins, decorated with protective deities at the corners.', N'Tutankhamun');
END;

-- Gilded Shrines (Four Shrines)
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'gilded-shrines-four-shrines');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gilded Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gilded Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/277832097a2544fd9f3c95a2d1af3385/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'gilded-shrines-four-shrines-3d-embed', N'text/html', N'https://sketchfab.com/models/277832097a2544fd9f3c95a2d1af3385/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'gilded-shrines-four-shrines-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'gilded-shrines-four-shrines', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.7, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.7,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Gilded Shrines (Four Shrines)',
        [Description] = N'Four nested gilded wooden shrines that surrounded the king''s sarcophagus in the burial chamber.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Gilded Shrines (Four Shrines)', N'Four nested gilded wooden shrines that surrounded the king''s sarcophagus in the burial chamber.', N'Tutankhamun');
END;

-- Royal Golden Throne
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'royal-golden-throne');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gilded Wood, Silver, Glass');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gilded Wood, Silver, Glass'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/5253bc094adb4ce7bb68f370d1f56301/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'royal-golden-throne-3d-embed', N'text/html', N'https://sketchfab.com/models/5253bc094adb4ce7bb68f370d1f56301/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'royal-golden-throne-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'royal-golden-throne', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.02, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.02,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Royal Golden Throne',
        [Description] = N'A wooden throne covered in gold, featuring a scene of the king and his wife Ankhesenamun.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Royal Golden Throne', N'A wooden throne covered in gold, featuring a scene of the king and his wife Ankhesenamun.', N'Tutankhamun');
END;

-- Great War Chariot
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'great-war-chariot');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Gold, Leather');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Gold, Leather'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/d29a834451014363a789edcc28ed90eb/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'great-war-chariot-3d-embed', N'text/html', N'https://sketchfab.com/models/d29a834451014363a789edcc28ed90eb/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'great-war-chariot-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'great-war-chariot', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, 1.02, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = 1.02,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Great War Chariot',
        [Description] = N'One of the large military-style chariots used for ceremonies or hunts.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Great War Chariot', N'One of the large military-style chariots used for ceremonies or hunts.', N'Tutankhamun');
END;

-- Ceremonial Chariot
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'ceremonial-chariot');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/8bdbc56cc989432c804b08dd02a74e60/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'ceremonial-chariot-3d-embed', N'text/html', N'https://sketchfab.com/models/8bdbc56cc989432c804b08dd02a74e60/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'ceremonial-chariot-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'ceremonial-chariot', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, 0.95, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = 0.95,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Ceremonial Chariot',
        [Description] = N'A highly decorated chariot designed for royal processions.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Ceremonial Chariot', N'A highly decorated chariot designed for royal processions.', N'Tutankhamun');
END;

-- The Ka Statue
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'the-ka-statue');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/9ead56cffdab4e20a1d08d6c2bbfff22/embed?autostart=1&ui_theme=dark');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'the-ka-statue-3d-embed', N'text/html', N'https://sketchfab.com/models/9ead56cffdab4e20a1d08d6c2bbfff22/embed?autostart=1&ui_theme=dark', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'the-ka-statue-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'the-ka-statue', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.92, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.92,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'The Ka Statue',
        [Description] = N'Life-sized black wooden statue representing the king''s spirit, acting as a tomb guardian.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'The Ka Statue', N'Life-sized black wooden statue representing the king''s spirit, acting as a tomb guardian.', N'Tutankhamun');
END;

-- Alabaster Canopic Chest
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'alabaster-canopic-chest');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Calcite (Alabaster)');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Calcite (Alabaster)'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/d67f1d336e34459497ba980dc5953f39/embed?autostart=1&ui_theme=dark');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'alabaster-canopic-chest-3d-embed', N'text/html', N'https://sketchfab.com/models/d67f1d336e34459497ba980dc5953f39/embed?autostart=1&ui_theme=dark', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'alabaster-canopic-chest-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'alabaster-canopic-chest', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 85, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 85,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Alabaster Canopic Chest',
        [Description] = N'A chest used to store the four jars containing the king''s internal organs.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Alabaster Canopic Chest', N'A chest used to store the four jars containing the king''s internal organs.', N'Tutankhamun');
END;

-- Statues of the Protective Goddesses
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'statues-of-the-protective-goddesses');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gilded Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gilded Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/a04030b9268c4db9a6d21378700914c3/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'statues-of-the-protective-goddesses-3d-embed', N'text/html', N'https://sketchfab.com/models/a04030b9268c4db9a6d21378700914c3/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'statues-of-the-protective-goddesses-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'statues-of-the-protective-goddesses', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 90, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 90,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Statues of the Protective Goddesses',
        [Description] = N'Four golden statues of Isis, Nephthys, Selket, and Neith guarding the canopic chest.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Statues of the Protective Goddesses', N'Four golden statues of Isis, Nephthys, Selket, and Neith guarding the canopic chest.', N'Tutankhamun');
END;

-- Cow-Headed Funerary Bed
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'cow-headed-funerary-bed');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gilded Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gilded Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/af779ec92a594c7786d1e1fcd5c0b8a9/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'cow-headed-funerary-bed-3d-embed', N'text/html', N'https://sketchfab.com/models/af779ec92a594c7786d1e1fcd5c0b8a9/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'cow-headed-funerary-bed-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'cow-headed-funerary-bed', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Cow-Headed Funerary Bed',
        [Description] = N'A ritual bed representing the celestial cow Mehet-Weret, carrying the king to the sky.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Cow-Headed Funerary Bed', N'A ritual bed representing the celestial cow Mehet-Weret, carrying the king to the sky.', N'Tutankhamun');
END;

-- Painted Wardrobe Chest
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'painted-wardrobe-chest');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Painted Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Painted Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/3d43740429814f9aa94b2f23ca0b7b9c/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'painted-wardrobe-chest-3d-embed', N'text/html', N'https://sketchfab.com/models/3d43740429814f9aa94b2f23ca0b7b9c/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'painted-wardrobe-chest-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'painted-wardrobe-chest', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, 40, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = 40,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Painted Wardrobe Chest',
        [Description] = N'A famous chest decorated with detailed scenes of the king in battle against enemies.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Painted Wardrobe Chest', N'A famous chest decorated with detailed scenes of the king in battle against enemies.', N'Tutankhamun');
END;

-- Ostrich Feather Fan
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'ostrich-feather-fan');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gold, Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gold, Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/981c038c5e20402582954a060a99b6ed/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'ostrich-feather-fan-3d-embed', N'text/html', N'https://sketchfab.com/models/981c038c5e20402582954a060a99b6ed/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'ostrich-feather-fan-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'ostrich-feather-fan', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Ostrich Feather Fan',
        [Description] = N'A ceremonial fan with a golden handle, once held real ostrich feathers for the king''s comfort.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Ostrich Feather Fan', N'A ceremonial fan with a golden handle, once held real ostrich feathers for the king''s comfort.', N'Tutankhamun');
END;

-- Meteoric Iron Dagger
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'meteoric-iron-dagger');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Meteoric Iron, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Meteoric Iron, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/526d0fe88388480eaf29dfec25bfe20a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'meteoric-iron-dagger-3d-embed', N'text/html', N'https://sketchfab.com/models/526d0fe88388480eaf29dfec25bfe20a/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'meteoric-iron-dagger-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'meteoric-iron-dagger', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Meteoric Iron Dagger',
        [Description] = N'A rare dagger found on the king''s mummy, made from iron of extraterrestrial (meteoric) origin.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Meteoric Iron Dagger', N'A rare dagger found on the king''s mummy, made from iron of extraterrestrial (meteoric) origin.', N'Tutankhamun');
END;

-- Winged Scarab Necklace
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'winged-scarab-necklace');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gold, Desert Glass, Lapis Lazuli');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gold, Desert Glass, Lapis Lazuli'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/7fc4496e06b74293b23b24afc28b46e6/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'winged-scarab-necklace-3d-embed', N'text/html', N'https://sketchfab.com/models/7fc4496e06b74293b23b24afc28b46e6/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'winged-scarab-necklace-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'winged-scarab-necklace', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, 15, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = 15,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Winged Scarab Necklace',
        [Description] = N'A magnificent piece of jewelry featuring a central scarab made of Libyan desert glass.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Winged Scarab Necklace', N'A magnificent piece of jewelry featuring a central scarab made of Libyan desert glass.', N'Tutankhamun');
END;

-- Anubis Shrine
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'anubis-shrine');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Varnished Wood, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Varnished Wood, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/3960cebd332346dc8eb275b2c8288101/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'anubis-shrine-3d-embed', N'text/html', N'https://sketchfab.com/models/3960cebd332346dc8eb275b2c8288101/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'anubis-shrine-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'anubis-shrine', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 1.1, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 1.1,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Anubis Shrine',
        [Description] = N'A wooden statue of Anubis in jackal form, reclining on a gilded shrine, used to protect the Treasury room.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Anubis Shrine', N'A wooden statue of Anubis in jackal form, reclining on a gilded shrine, used to protect the Treasury room.', N'Tutankhamun');
END;

-- King Hunting with Harpoon
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'king-hunting-with-harpoon');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gilded Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gilded Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/0f18b35477ca4808a6d04d47d3b2c58f/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'king-hunting-with-harpoon-3d-embed', N'text/html', N'https://sketchfab.com/models/0f18b35477ca4808a6d04d47d3b2c58f/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'king-hunting-with-harpoon-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'king-hunting-with-harpoon', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 75, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 75,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'King Hunting with Harpoon',
        [Description] = N'A gilded statue of Tutankhamun standing on a papyrus skiff, throwing a harpoon.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'King Hunting with Harpoon', N'A gilded statue of Tutankhamun standing on a papyrus skiff, throwing a harpoon.', N'Tutankhamun');
END;

-- Funerary Boat Models
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'funerary-boat-models');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Painted Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Painted Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/09650b26200548f5995eef58237f2eea/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'funerary-boat-models-3d-embed', N'text/html', N'https://sketchfab.com/models/09650b26200548f5995eef58237f2eea/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'funerary-boat-models-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'funerary-boat-models', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Funerary Boat Models',
        [Description] = N'A collection of 35 miniature wooden boats intended to transport the king''s spirit across the celestial waters.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Funerary Boat Models', N'A collection of 35 miniature wooden boats intended to transport the king''s spirit across the celestial waters.', N'Tutankhamun');
END;

-- Ceremonial Hunting Shield
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'ceremonial-hunting-shield');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Gilded Leather');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Gilded Leather'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/04ca992a5c704a5896586243287a0869/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'ceremonial-hunting-shield-3d-embed', N'text/html', N'https://sketchfab.com/models/04ca992a5c704a5896586243287a0869/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'ceremonial-hunting-shield-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'ceremonial-hunting-shield', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 70, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 70,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Ceremonial Hunting Shield',
        [Description] = N'A shield decorated with a scene of the king as a sphinx trampling his enemies.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Ceremonial Hunting Shield', N'A shield decorated with a scene of the king as a sphinx trampling his enemies.', N'Tutankhamun');
END;

-- Royal Bow and Arrows
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'royal-bow-and-arrows');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Horn, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Horn, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/37e6756681594907a2471d18abc1471e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'royal-bow-and-arrows-3d-embed', N'text/html', N'https://sketchfab.com/models/37e6756681594907a2471d18abc1471e/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'royal-bow-and-arrows-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'royal-bow-and-arrows', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Royal Bow and Arrows',
        [Description] = N'The king''s composite bow and a set of arrows, representing his role as a warrior and hunter.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Royal Bow and Arrows', N'The king''s composite bow and a set of arrows, representing his role as a warrior and hunter.', N'Tutankhamun');
END;

-- Golden Sandals
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'golden-sandals');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Solid Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Solid Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/f811f1f4183b4f4cbdb633581274febd/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'golden-sandals-3d-embed', N'text/html', N'https://sketchfab.com/models/f811f1f4183b4f4cbdb633581274febd/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'golden-sandals-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'golden-sandals', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Golden Sandals',
        [Description] = N'Exquisite gold sandals found on the feet of the king''s mummy, mimicking woven reed sandals.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Golden Sandals', N'Exquisite gold sandals found on the feet of the king''s mummy, mimicking woven reed sandals.', N'Tutankhamun');
END;

-- Senet Game Board
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'senet-game-board');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Ebony, Ivory, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Ebony, Ivory, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/44e6d1d37add41fbade46a94053cfa43/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'senet-game-board-3d-embed', N'text/html', N'https://sketchfab.com/models/44e6d1d37add41fbade46a94053cfa43/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'senet-game-board-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'senet-game-board', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Senet Game Board',
        [Description] = N'An ivory and ebony board for the game of Senet, symbolizing the passage of the soul to the afterlife.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Senet Game Board', N'An ivory and ebony board for the game of Senet, symbolizing the passage of the soul to the afterlife.', N'Tutankhamun');
END;

-- Silver Trumpet
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'silver-trumpet');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Silver, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Silver, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/5ec2ee051a2d469690338314ad49e554/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'silver-trumpet-3d-embed', N'text/html', N'https://sketchfab.com/models/5ec2ee051a2d469690338314ad49e554/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'silver-trumpet-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'silver-trumpet', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Silver Trumpet',
        [Description] = N'A rare ceremonial silver trumpet used in rituals, known for its clear, piercing sound.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Silver Trumpet', N'A rare ceremonial silver trumpet used in rituals, known for its clear, piercing sound.', N'Tutankhamun');
END;

-- Bronze Trumpet
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'bronze-trumpet');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Bronze (Copper)');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Bronze (Copper)'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/5ec2ee051a2d469690338314ad49e554/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'bronze-trumpet-3d-embed', N'text/html', N'https://sketchfab.com/models/5ec2ee051a2d469690338314ad49e554/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'bronze-trumpet-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'bronze-trumpet', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Bronze Trumpet',
        [Description] = N'The copper/bronze counterpart to the silver trumpet, used in military or ritual contexts.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Bronze Trumpet', N'The copper/bronze counterpart to the silver trumpet, used in military or ritual contexts.', N'Tutankhamun');
END;

-- Childhood Ebony Chair
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'childhood-ebony-chair');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Ebony, Ivory, Gold');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Ebony, Ivory, Gold'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/90e45042cd7245c9ac53aae48e10168c/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'childhood-ebony-chair-3d-embed', N'text/html', N'https://sketchfab.com/models/90e45042cd7245c9ac53aae48e10168c/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'childhood-ebony-chair-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'childhood-ebony-chair', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 71, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 71,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Childhood Ebony Chair',
        [Description] = N'A small, beautifully crafted chair made of ebony and inlaid with ivory, used by the king as a child.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Childhood Ebony Chair', N'A small, beautifully crafted chair made of ebony and inlaid with ivory, used by the king as a child.', N'Tutankhamun');
END;

-- Blue Glass Headrest
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'blue-glass-headrest');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Dark Blue Glass');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Dark Blue Glass'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/2593ca03edf84fa382c829ab3f392ce0/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'blue-glass-headrest-3d-embed', N'text/html', N'https://sketchfab.com/models/2593ca03edf84fa382c829ab3f392ce0/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'blue-glass-headrest-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'blue-glass-headrest', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 18.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 18.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Blue Glass Headrest',
        [Description] = N'A ceremonial headrest made of deep blue glass, representing the horizon (Akhet).',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Blue Glass Headrest', N'A ceremonial headrest made of deep blue glass, representing the horizon (Akhet).', N'Tutankhamun');
END;

-- King's Ushabti Figurine
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'kings-ushabti-figurine');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Gilded');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Gilded'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/763ece58611d4e6eb7bb93ab34d9881b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'kings-ushabti-figurine-3d-embed', N'text/html', N'https://sketchfab.com/models/763ece58611d4e6eb7bb93ab34d9881b/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'kings-ushabti-figurine-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'kings-ushabti-figurine', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 48, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 48,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'King''s Ushabti Figurine',
        [Description] = N'A small wooden statue of the king, intended to perform tasks for him in the afterlife.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'King''s Ushabti Figurine', N'A small wooden statue of the king, intended to perform tasks for him in the afterlife.', N'Tutankhamun');
END;

-- Alabaster Perfume Vessel
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'alabaster-perfume-vessel');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Calcite (Alabaster)');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Calcite (Alabaster)'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/4db1321a1bd34236afa0db91f65688d8/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'alabaster-perfume-vessel-3d-embed', N'text/html', N'https://sketchfab.com/models/4db1321a1bd34236afa0db91f65688d8/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'alabaster-perfume-vessel-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'alabaster-perfume-vessel', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 25, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 25,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Alabaster Perfume Vessel',
        [Description] = N'An intricately carved alabaster container used for holding precious oils and perfumes.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Alabaster Perfume Vessel', N'An intricately carved alabaster container used for holding precious oils and perfumes.', N'Tutankhamun');
END;

-- Wooden Clothing Bust (Mannequin)
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'wooden-clothing-bust-mannequin');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Painted Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Painted Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/35fec58b221a426ba9dc0b9908c03695/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'wooden-clothing-bust-mannequin-3d-embed', N'text/html', N'https://sketchfab.com/models/35fec58b221a426ba9dc0b9908c03695/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'wooden-clothing-bust-mannequin-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'wooden-clothing-bust-mannequin', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 73, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 73,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Wooden Clothing Bust (Mannequin)',
        [Description] = N'A lifelike wooden bust of the king, likely used as a mannequin for his robes and jewelry.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Wooden Clothing Bust (Mannequin)', N'A lifelike wooden bust of the king, likely used as a mannequin for his robes and jewelry.', N'Tutankhamun');
END;

-- Scarab Signet Ring
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'scarab-signet-ring');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gold, Lapis Lazuli');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gold, Lapis Lazuli'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/d24f3d8d372c47e3854b1b3033278c32/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'scarab-signet-ring-3d-embed', N'text/html', N'https://sketchfab.com/models/d24f3d8d372c47e3854b1b3033278c32/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'scarab-signet-ring-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'scarab-signet-ring', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Scarab Signet Ring',
        [Description] = N'A gold signet ring featuring a finely carved lapis lazuli scarab with the king''s cartouche.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Scarab Signet Ring', N'A gold signet ring featuring a finely carved lapis lazuli scarab with the king''s cartouche.', N'Tutankhamun');
END;

-- Inscribed Ivory Box
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'inscribed-ivory-box');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Ivory');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Ivory'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/af779ec92a594c7786d1e1fcd5c0b8a9/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'inscribed-ivory-box-3d-embed', N'text/html', N'https://sketchfab.com/models/af779ec92a594c7786d1e1fcd5c0b8a9/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'inscribed-ivory-box-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'inscribed-ivory-box', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Inscribed Ivory Box',
        [Description] = N'A delicately carved ivory box with intricate inscriptions and scenes from the king''s life.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Inscribed Ivory Box', N'A delicately carved ivory box with intricate inscriptions and scenes from the king''s life.', N'Tutankhamun');
END;

-- Gilded Statue of Ptah
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'gilded-statue-of-ptah');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Tutankhamun Gallery');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Tutankhamun Gallery'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Gilded Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Gilded Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Valley of the Kings (KV62)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Valley of the Kings (KV62)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/02040818b3ce42c7b427a8371807af62/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'gilded-statue-of-ptah-3d-embed', N'text/html', N'https://sketchfab.com/models/02040818b3ce42c7b427a8371807af62/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'gilded-statue-of-ptah-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'gilded-statue-of-ptah', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 55, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 55,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Gilded Statue of Ptah',
        [Description] = N'A divine statue of the creator god Ptah, covered in gold leaf, found among the ritual objects.',
        [HistoricalStory] = N'Tutankhamun'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Gilded Statue of Ptah', N'A divine statue of the creator god Ptah, covered in gold leaf, found among the ritual objects.', N'Tutankhamun');
END;

-- Khufu's Solar Boat
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'khufus-solar-boat');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Solar Boat Pavilion');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Solar Boat Pavilion'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Old Kingdom, 4th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Old Kingdom, 4th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Cedar Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Cedar Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Giza (Khufu Pyramid)');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Giza (Khufu Pyramid)', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/560d1842576345a9b96572bb338901fb/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'khufus-solar-boat-3d-embed', N'text/html', N'https://sketchfab.com/models/560d1842576345a9b96572bb338901fb/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'khufus-solar-boat-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'khufus-solar-boat', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Khufu''s Solar Boat',
        [Description] = N'The oldest intact wooden vessel in the world, used for the Pharaoh''s funerary journey.',
        [HistoricalStory] = N'Khufu'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Khufu''s Solar Boat', N'The oldest intact wooden vessel in the world, used for the Pharaoh''s funerary journey.', N'Khufu');
END;

-- Small Statue of Khufu
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'small-statue-of-khufu');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Old Kingdom, 4th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Old Kingdom, 4th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Ivory');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Ivory'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Abydos');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Abydos', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b5bde7711b154764978d09340ff3a406/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'small-statue-of-khufu-3d-embed', N'text/html', N'https://sketchfab.com/models/b5bde7711b154764978d09340ff3a406/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'small-statue-of-khufu-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'small-statue-of-khufu', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 7.5, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 7.5,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Small Statue of Khufu',
        [Description] = N'The only known three-dimensional representation of Khufu, a tiny ivory masterpiece.',
        [HistoricalStory] = N'Khufu'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Small Statue of Khufu', N'The only known three-dimensional representation of Khufu, a tiny ivory masterpiece.', N'Khufu');
END;

-- Hetepheres Collection (Bed/Chair)
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'hetepheres-collection-bedchair');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Old Kingdom, 4th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Old Kingdom, 4th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Wood, Gold Leaf');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Wood, Gold Leaf'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Giza');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Giza', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/4ccbcc060ce246e897e2750cfbafb7ec/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'hetepheres-collection-bedchair-3d-embed', N'text/html', N'https://sketchfab.com/models/4ccbcc060ce246e897e2750cfbafb7ec/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'hetepheres-collection-bedchair-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'hetepheres-collection-bedchair', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Hetepheres Collection (Bed/Chair)',
        [Description] = N'Domestic royal furniture from the Old Kingdom belonging to the mother of Khufu.',
        [HistoricalStory] = N'Hetepheres'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Hetepheres Collection (Bed/Chair)', N'Domestic royal furniture from the Old Kingdom belonging to the mother of Khufu.', N'Hetepheres');
END;

-- Egyptian Scribe (GEM Copy)
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'egyptian-scribe-gem-copy');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Old Kingdom, 4th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Old Kingdom, 4th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Painted Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Painted Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Saqqara');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Saqqara', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/be699d5cd26e4c2fa831cca6651b9212/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'egyptian-scribe-gem-copy-3d-embed', N'text/html', N'https://sketchfab.com/models/be699d5cd26e4c2fa831cca6651b9212/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'egyptian-scribe-gem-copy-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'egyptian-scribe-gem-copy', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 53, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 53,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Egyptian Scribe (GEM Copy)',
        [Description] = N'A representation of the administrative class, showing a seated scribe ready to write.',
        [HistoricalStory] = N'Unknown'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Egyptian Scribe (GEM Copy)', N'A representation of the administrative class, showing a seated scribe ready to write.', N'Unknown');
END;

-- Victory Stele of Merneptah
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'victory-stele-of-merneptah');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 19th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 19th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Thebes');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Thebes', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b1c1b7c155fb48e4803775a4bbc3c506/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'victory-stele-of-merneptah-3d-embed', N'text/html', N'https://sketchfab.com/models/b1c1b7c155fb48e4803775a4bbc3c506/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'victory-stele-of-merneptah-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'victory-stele-of-merneptah', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 3.1, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 3.1,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Victory Stele of Merneptah',
        [Description] = N'A monumental stele recording the military triumphs of King Merneptah.',
        [HistoricalStory] = N'Merneptah'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Victory Stele of Merneptah', N'A monumental stele recording the military triumphs of King Merneptah.', N'Merneptah');
END;

-- Amenemhat III (Lion Head)
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'amenemhat-iii-lion-head');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Middle Kingdom, 12th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Middle Kingdom, 12th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Granite');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Granite'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Tanis');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Tanis', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/b62546fca1d04896b8fff19d0ad4e230/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'amenemhat-iii-lion-head-3d-embed', N'text/html', N'https://sketchfab.com/models/b62546fca1d04896b8fff19d0ad4e230/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'amenemhat-iii-lion-head-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'amenemhat-iii-lion-head', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 2.1, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 2.1,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Amenemhat III (Lion Head)',
        [Description] = N'A unique representation of the king with lion-like strength and features.',
        [HistoricalStory] = N'Amenemhat III'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Amenemhat III (Lion Head)', N'A unique representation of the king with lion-like strength and features.', N'Amenemhat III');
END;

-- Fayum Portraits Selection
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'fayum-portraits-selection');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'Roman Period');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'Roman Period', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Encaustic on Wood');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Encaustic on Wood'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Fayum');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Fayum', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/0eeee86532d34a91bf71956a5da65399/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'fayum-portraits-selection-3d-embed', N'text/html', N'https://sketchfab.com/models/0eeee86532d34a91bf71956a5da65399/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'fayum-portraits-selection-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'fayum-portraits-selection', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, 40, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = 40,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Fayum Portraits Selection',
        [Description] = N'Lifelike funerary portraits from the Roman period showing a blend of cultures.',
        [HistoricalStory] = N'Various'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Fayum Portraits Selection', N'Lifelike funerary portraits from the Roman period showing a blend of cultures.', N'Various');
END;

-- Nefertiti and Akhenaten Artworks
SET @ArtifactId = (SELECT TOP 1 [Id] FROM [Artifacts] WHERE [Slug] = N'nefertiti-and-akhenaten-artworks');
SET @CategoryId = NULL;
SET @EraId = NULL;
SET @MaterialId = NULL;
SET @DiscoveryLocationId = NULL;
SET @ModelFileId = NULL;
SET @ThumbFileId = NULL;
SET @CategoryId = (SELECT TOP 1 [Id] FROM [Categories] WHERE [Name] = N'Main Exhibition Halls');
IF @CategoryId IS NULL BEGIN SET @CategoryId = NEWID(); INSERT INTO [Categories] ([Id], [Name]) VALUES (@CategoryId, N'Main Exhibition Halls'); END;
SET @EraId = (SELECT TOP 1 [Id] FROM [Eras] WHERE [Name] = N'New Kingdom, 18th Dynasty');
IF @EraId IS NULL BEGIN SET @EraId = NEWID(); INSERT INTO [Eras] ([Id], [Name], [StartYear], [EndYear]) VALUES (@EraId, N'New Kingdom, 18th Dynasty', NULL, NULL); END;
SET @MaterialId = (SELECT TOP 1 [Id] FROM [Materials] WHERE [Name] = N'Painted Limestone');
IF @MaterialId IS NULL BEGIN SET @MaterialId = NEWID(); INSERT INTO [Materials] ([Id], [Name]) VALUES (@MaterialId, N'Painted Limestone'); END;
SET @DiscoveryLocationId = (SELECT TOP 1 [Id] FROM [DiscoveryLocations] WHERE [Name] = N'Amarna');
IF @DiscoveryLocationId IS NULL BEGIN SET @DiscoveryLocationId = NEWID(); INSERT INTO [DiscoveryLocations] ([Id], [Name], [Latitude], [Longitude]) VALUES (@DiscoveryLocationId, N'Amarna', NULL, NULL); END;
SET @ModelFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://sketchfab.com/models/8c60faca6152405e9d35784efa8b9aa1/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0');
IF @ModelFileId IS NULL BEGIN SET @ModelFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ModelFileId, N'nefertiti-and-akhenaten-artworks-3d-embed', N'text/html', N'https://sketchfab.com/models/8c60faca6152405e9d35784efa8b9aa1/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_hint=0', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
SET @ThumbFileId = (SELECT TOP 1 [Id] FROM [Files] WHERE [Url] = N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G');
IF @ThumbFileId IS NULL BEGIN SET @ThumbFileId = NEWID(); INSERT INTO [Files] ([Id], [FileName], [FileType], [Url], [StorageProvider], [UploadedBy], [CreatedAt]) VALUES (@ThumbFileId, N'nefertiti-and-akhenaten-artworks-thumb', N'image', N'https://drive.google.com/uc?export=view&id=1VXx9jgwjXeHO3YdooiJIsqYt9L1lmJ2G', N'external', ISNULL(@AdminUserId, '00000000-0000-0000-0000-000000000000'), SYSUTCDATETIME()); END;
IF @ArtifactId IS NULL
BEGIN
    SET @ArtifactId = NEWID();
    INSERT INTO [Artifacts] ([Id], [Slug], [EraId], [CategoryId], [MaterialId], [DiscoveryLocationId], [ModelFileId], [ThumbnailFileId], [Height], [Width], [Depth], [Weight], [CreatedBy], [CreatedAt])
    VALUES (@ArtifactId, N'nefertiti-and-akhenaten-artworks', @EraId, @CategoryId, @MaterialId, @DiscoveryLocationId, @ModelFileId, @ThumbFileId, NULL, NULL, NULL, NULL, @AdminUserId, SYSUTCDATETIME());
END
ELSE
BEGIN
    UPDATE [Artifacts]
    SET [EraId] = @EraId,
        [CategoryId] = @CategoryId,
        [MaterialId] = @MaterialId,
        [DiscoveryLocationId] = @DiscoveryLocationId,
        [ModelFileId] = @ModelFileId,
        [ThumbnailFileId] = @ThumbFileId,
        [Height] = NULL,
        [Width] = NULL,
        [Depth] = NULL,
        [Weight] = NULL
    WHERE [Id] = @ArtifactId;
END;

IF EXISTS (SELECT 1 FROM [ArtifactTranslations] WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en')
BEGIN
    UPDATE [ArtifactTranslations]
    SET [Name] = N'Nefertiti and Akhenaten Artworks',
        [Description] = N'Artistic representations of Akhenaten and Nefertiti from the revolutionary Amarna period.',
        [HistoricalStory] = N'Akhenaten / Nefertiti'
    WHERE [ArtifactId] = @ArtifactId AND [LanguageCode] = N'en';
END
ELSE
BEGIN
    INSERT INTO [ArtifactTranslations] ([Id], [ArtifactId], [LanguageCode], [Name], [Description], [HistoricalStory])
    VALUES (NEWID(), @ArtifactId, N'en', N'Nefertiti and Akhenaten Artworks', N'Artistic representations of Akhenaten and Nefertiti from the revolutionary Amarna period.', N'Akhenaten / Nefertiti');
END;

COMMIT TRANSACTION;
SELECT COUNT(*) AS TotalArtifacts FROM [Artifacts];
SELECT COUNT(*) AS EnglishTranslations FROM [ArtifactTranslations] WHERE [LanguageCode] = N'en';
